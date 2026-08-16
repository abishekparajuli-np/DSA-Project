const MetricsDashboard = ({ result }) => {
  if (!result) return null;

  const metrics = [
    {
      icon: '⏱️',
      label: 'Time Taken',
      value: result.time ? `${result.time.toFixed(3)} ms` : '--',
    },
    {
      icon: '🔢',
      label: 'Comparisons',
      value: result.comparisons ?? '--',
    },
    {
      icon: '🔄',
      label: 'Swaps',
      value: result.swaps ?? '--',
    },
    {
      icon: '📏',
      label: 'Complexity',
      value: result.complexity || '--',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
      {metrics.map((metric, idx) => (
        <div key={idx} className="card text-center">
          <div className="text-3xl mb-2">{metric.icon}</div>
          <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
          <div className="text-2xl font-bold text-indigo-400">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
