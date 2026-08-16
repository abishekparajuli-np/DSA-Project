import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsPanel = ({ statistics }) => {
  if (!statistics) return null;

  const stats = [
    { label: 'Count', value: statistics.count },
    { label: 'Mean', value: statistics.mean?.toFixed(2) },
    { label: 'Median', value: statistics.median?.toFixed(2) },
    { label: 'Mode', value: statistics.mode?.value },
    { label: 'Std Dev', value: statistics.std_dev?.toFixed(2) },
    { label: 'Variance', value: statistics.variance?.toFixed(2) },
    { label: 'Min', value: statistics.min_max?.min?.toFixed(2) },
    { label: 'Max', value: statistics.min_max?.max?.toFixed(2) },
    { label: 'Range', value: statistics.min_max?.range?.toFixed(2) },
    { label: 'Q1', value: statistics.quartiles?.q1?.toFixed(2) },
    { label: 'Q2', value: statistics.quartiles?.q2?.toFixed(2) },
    { label: 'Q3', value: statistics.quartiles?.q3?.toFixed(2) },
  ].filter(s => s.value !== undefined && s.value !== 'undefined');

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">Statistical Analysis</h3>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {statistics.distribution && statistics.distribution.bins && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4 className="panel-subtitle">Distribution</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statistics.distribution.bins}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="min"
                stroke="var(--text-tertiary)"
                tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
                tickFormatter={(value) => value.toFixed(0)}
              />
              <YAxis
                stroke="var(--text-tertiary)"
                tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Bar dataKey="count" fill="var(--color-violet)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
