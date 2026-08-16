export type MetricPoint = {
  date: string;
  users: number;
  payingUsers: number;
  revenue: number;
};

export type PublicMetrics = {
  currency: 'USD';
  points: MetricPoint[];
  summary: Omit<MetricPoint, 'date'>;
  updatedAt: string;
};
