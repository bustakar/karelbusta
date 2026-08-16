import type { MetricPoint, PublicMetrics } from '../src/metrics';

type RequestLike = { method?: string };
type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type SeriesPoint = { date: string; value: number };

export default async function handler(request: RequestLike, response: ResponseLike) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const projectId = process.env.REVENUECAT_PROJECT_ID;
  const secret = process.env.REVENUECAT_SECRET_API_KEY;
  if (!projectId || !secret) {
    response.status(503).json({ error: 'Metrics are not configured' });
    return;
  }

  try {
    const body = await loadMetrics(projectId, secret);
    response.setHeader('cache-control', 'public, s-maxage=900, stale-while-revalidate=86400');
    response.status(200).json(body);
  } catch (error) {
    console.error('RevenueCat metrics request failed', error);
    response.status(502).json({ error: 'Metrics are temporarily unavailable' });
  }
}

export async function loadMetrics(projectId: string, secret: string) {
  const startDate = '2020-01-01';
  const endDate = new Date().toISOString().slice(0, 10);
  const [customers, paying, revenue] = await Promise.all([
    getChart(projectId, secret, 'customers_new', startDate, endDate),
    getChart(projectId, secret, 'actives', startDate, endDate),
    getChart(projectId, secret, 'revenue', startDate, endDate, {
      selectors: JSON.stringify({ revenue_type: 'revenue' }),
      currency: 'USD',
    }),
  ]);
  return combineMetrics(customers, paying, revenue);
}

async function getChart(
  projectId: string,
  secret: string,
  chart: string,
  startDate: string,
  endDate: string,
  extra: Record<string, string> = {},
) {
  const query = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    resolution: 'month',
    ...extra,
  });
  const result = await fetch(
    `https://api.revenuecat.com/v2/projects/${encodeURIComponent(projectId)}/charts/${chart}?${query}`,
    { headers: { Authorization: `Bearer ${secret}` } },
  );
  if (!result.ok) throw new Error(`RevenueCat ${chart} returned ${result.status}`);
  return parseSeries(await result.json());
}

function parseSeries(payload: unknown): SeriesPoint[] {
  if (!isRecord(payload) || !Array.isArray(payload.values)) {
    throw new Error('RevenueCat returned an unexpected chart response');
  }
  return payload.values.flatMap((entry) => {
    if (Array.isArray(entry) && entry.length >= 2) {
      const date = normalizedDate(entry[0]);
      const value = numericValue(entry.at(-1));
      return date && value !== null ? [{ date, value }] : [];
    }
    if (isRecord(entry)) {
      if (typeof entry.measure === 'number' && entry.measure !== 0) return [];
      const date = normalizedDate(entry.date ?? entry.timestamp ?? entry.period ?? entry.cohort);
      const value = numericValue(entry.value);
      return date && value !== null ? [{ date, value }] : [];
    }
    return [];
  });
}

function combineMetrics(
  customerSeries: SeriesPoint[],
  payingSeries: SeriesPoint[],
  revenueSeries: SeriesPoint[],
): PublicMetrics {
  const customers = new Map(customerSeries.map((point) => [point.date, point.value]));
  const paying = new Map(payingSeries.map((point) => [point.date, point.value]));
  const revenue = new Map(revenueSeries.map((point) => [point.date, point.value]));
  const dates = [...new Set([...customers.keys(), ...paying.keys(), ...revenue.keys()])].sort();
  let customerTotal = 0;
  const points: MetricPoint[] = dates.map((date) => {
    customerTotal += customers.get(date) ?? 0;
    return {
      date,
      users: Math.round(customerTotal),
      payingUsers: Math.round(paying.get(date) ?? 0),
      revenue: Math.round((revenue.get(date) ?? 0) * 100) / 100,
    };
  });
  const firstActiveIndex = points.findIndex(
    (point) => point.users !== 0 || point.payingUsers !== 0 || point.revenue !== 0,
  );
  const visiblePoints = firstActiveIndex > 0 ? points.slice(firstActiveIndex - 1) : points;
  const latest = points.at(-1);
  return {
    currency: 'USD',
    points: visiblePoints,
    summary: {
      users: latest?.users ?? 0,
      payingUsers: latest?.payingUsers ?? 0,
      revenue: latest?.revenue ?? 0,
    },
    updatedAt: new Date().toISOString(),
  };
}

function normalizedDate(value: unknown) {
  if (typeof value === 'string') {
    const date = value.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    if (date) return date;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    const milliseconds = value < 10_000_000_000 ? value * 1_000 : value;
    return new Date(milliseconds).toISOString().slice(0, 10);
  }
  return null;
}

function numericValue(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
