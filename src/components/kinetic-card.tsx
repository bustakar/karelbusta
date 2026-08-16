import { areaY, d3Curve, defineChart, lineY } from '@tanstack/charts';
import { Chart } from '@tanstack/react-charts';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleLinear, scaleOrdinal, scaleUtc } from 'd3-scale';
import { curveMonotoneX } from 'd3-shape';
import { useEffect, useMemo, useState } from 'react';
import type { PublicMetrics } from '../metrics';
import type { Locale } from '../site';

const series = [
  { id: 'revenue', color: '#10b981' },
  { id: 'users', color: '#2563eb' },
  { id: 'payingUsers', color: '#f59e0b' },
] as const;

type SeriesId = (typeof series)[number]['id'];

const chartCopy = {
  en: {
    revenue: 'Revenue',
    users: 'Users',
    payingUsers: 'Paying',
    customers: 'Customers',
    aria: 'Kinetic revenue, users, and paying users by month',
  },
  cs: {
    revenue: 'Tržby',
    users: 'Uživatelé',
    payingUsers: 'Platící',
    customers: 'Zákazníci',
    aria: 'Měsíční tržby, uživatelé a platící uživatelé Kinetic',
  },
} as const;

export function KineticCard({
  locale,
  metrics,
  onMetrics,
}: {
  locale: Locale;
  metrics: PublicMetrics | null;
  onMetrics: (metrics: PublicMetrics) => void;
}) {
  const copy = chartCopy[locale];
  const [showCounts, setShowCounts] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/metrics', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Metrics unavailable');
        return response.json() as Promise<PublicMetrics>;
      })
      .then(onMetrics)
      .catch(() => undefined);
    return () => controller.abort();
  }, [onMetrics]);

  const latest = metrics?.summary;

  return (
    <article className="kinetic-card">
      <a
        className="product-heading"
        href="https://kinetic.karelbusta.dev/"
        aria-label="Kinetic"
      >
        <img src="/apps/kinetic.webp" alt="" width="48" height="48" />
        <strong>Kinetic</strong>
      </a>

      <div className="metric-legend">
        <div className="revenue-metric">
          <span style={{ '--series-color': '#10b981' } as React.CSSProperties}>{copy.revenue}</span>
          <strong>{latest ? formatValue(latest.revenue, 'revenue') : '—'}</strong>
        </div>
        <button
          className="customers-toggle"
          type="button"
          aria-pressed={showCounts}
          onClick={() => setShowCounts((current) => !current)}
        >
          <span className="customers-label">{copy.customers}</span>
          <span className="customer-values">
            <span style={{ '--series-color': '#2563eb' } as React.CSSProperties}>
              <b>{latest ? formatValue(latest.users, 'users') : '—'}</b>
              {copy.users}
            </span>
            <span style={{ '--series-color': '#f59e0b' } as React.CSSProperties}>
              <b>{latest ? formatValue(latest.payingUsers, 'payingUsers') : '—'}</b>
              {copy.payingUsers}
            </span>
          </span>
        </button>
      </div>

      <MetricChart locale={locale} metrics={metrics} showCounts={showCounts} />
    </article>
  );
}

function MetricChart({
  locale,
  metrics,
  showCounts,
}: {
  locale: Locale;
  metrics: PublicMetrics | null;
  showCounts: boolean;
}) {
  const copy = chartCopy[locale];
  const monthLabel = new Intl.DateTimeFormat(locale === 'cs' ? 'cs-CZ' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const shortMonth = new Intl.DateTimeFormat(locale === 'cs' ? 'cs-CZ' : 'en-US', {
    month: 'short',
    timeZone: 'UTC',
  });
  const countMaximum = Math.max(
    1,
    ...(metrics?.points.flatMap((point) => [point.users, point.payingUsers]) ?? []),
  );
  const revenuePeak = Math.max(0, ...(metrics?.points.map((point) => point.revenue) ?? []));
  const revenueMaximum = Math.max(1, revenuePeak);
  const activeSeries = series.filter(
    (item) => item.id === 'revenue' || showCounts,
  );
  const definition = useMemo(() => {
    const dates = (metrics?.points ?? []).map(
      (point) => new Date(`${point.date}T00:00:00Z`),
    );
    const rows = (metrics?.points ?? []).flatMap((point) =>
      series.map((item) => ({
        date: new Date(`${point.date}T00:00:00Z`),
        series: item.id,
        actualValue: point[item.id],
        value:
          item.id === 'revenue'
            ? point[item.id] / revenueMaximum
            : showCounts
              ? point[item.id] / countMaximum
              : 0,
      })),
    );
    const color = scaleOrdinal<SeriesId, string>()
      .domain(series.map((item) => item.id))
      .range(series.map((item) => item.color));
    const curve = d3Curve(curveMonotoneX);

    return defineChart({
      marks: [
        areaY(rows, {
          x: 'date',
          y1: 0,
          y2: 'value',
          z: 'series',
          fill: (row) => `url(#${row.series}-fill)`,
          curve,
        }),
        lineY(rows, {
          x: 'date',
          y: 'value',
          z: 'series',
          color: 'series',
          strokeWidth: 2,
          curve,
        }),
      ],
      x: {
        scale: scaleUtc,
        axis: {
          line: false,
          ticks: {
            values: dates,
            size: 0,
            padding: 10,
            format: (value) => shortMonth.format(value),
          },
        },
      },
      y: {
        scale: () => scaleLinear().domain([0, 1]),
        nice: true,
        grid: true,
        axis: false,
      },
      color: { scale: color },
      gradients: series.map((item) => ({
        id: `${item.id}-fill`,
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0,
        stops: [
          { offset: 0, color: item.color, opacity: 0.02 },
          { offset: 1, color: item.color, opacity: 0.22 },
        ],
      })),
      clip: true,
      focus: 'group-x',
      tooltip: {
        use: tooltip,
        className: 'kinetic-chart-tooltip',
        sticky: false,
        formatGroup: (points) => {
          const values = new Map(points.map((point) => [point.datum.series, point.datum]));
          const date = points[0]?.datum.date;
          if (!date) return '';
          return [
            monthLabel.format(date),
            ...activeSeries.map((item) => {
              const value = values.get(item.id)?.actualValue ?? 0;
              return `${copy[item.id]}: ${formatValue(value, item.id)}`;
            }),
          ].join('\n');
        },
      },
      svgAnimation: { duration: 480, easing: springEasing },
    });
  }, [activeSeries, countMaximum, metrics, revenueMaximum, showCounts]);

  return (
    <div className="chart-wrap">
      {metrics?.points.length ? (
        <>
          <Chart
            definition={definition}
            height={240}
            initialWidth={640}
            ariaLabel={copy.aria}
          />
          <div
            className="value-axis revenue-axis"
            data-empty={revenuePeak === 0}
            aria-hidden="true"
          >
            {revenuePeak > 0 ? (
              <>
                <span>{compactCurrency(revenuePeak)}</span>
                <span>{compactCurrency(revenuePeak / 2)}</span>
                <span>$0</span>
              </>
            ) : (
              <span>$0</span>
            )}
          </div>
          {showCounts ? (
            <div className="value-axis count-axis" aria-hidden="true">
              <span>{compactNumber.format(countMaximum)}</span>
              <span>{compactNumber.format(countMaximum / 2)}</span>
              <span>0</span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

const compactNumber = new Intl.NumberFormat('en-US', { notation: 'compact' });
function springEasing(progress: number) {
  const value = 1 - Math.exp(-7 * progress) * Math.cos(10 * progress);
  const end = 1 - Math.exp(-7) * Math.cos(10);
  return value / end;
}

function compactCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatValue(value: number, metric: SeriesId) {
  if (metric === 'revenue') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat('en-US').format(value);
}
