import { Clock, Hash, ArrowLeftRight, Gauge } from 'lucide-react';

const MetricsDashboard = ({ result }) => {
  if (!result) return null;

  const metrics = [
    {
      icon: <Clock size={18} />,
      label: 'Time',
      value: result.time ? `${result.time.toFixed(3)} ms` : '—',
      color: 'var(--color-blue)',
    },
    {
      icon: <Hash size={18} />,
      label: 'Comparisons',
      value: result.comparisons ?? '—',
      color: 'var(--color-violet)',
    },
    {
      icon: <ArrowLeftRight size={18} />,
      label: 'Swaps',
      value: result.swaps ?? '—',
      color: 'var(--color-amber)',
    },
    {
      icon: <Gauge size={18} />,
      label: 'Complexity',
      value: result.complexity || '—',
      color: 'var(--color-emerald)',
    },
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((metric, idx) => (
        <div key={idx} className="metric-card">
          <div className="metric-icon" style={{ color: metric.color }}>
            {metric.icon}
          </div>
          <div className="metric-body">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
