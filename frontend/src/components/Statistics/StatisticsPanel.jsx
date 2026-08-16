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
    <div className="card animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">📊 Statistical Analysis</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-700 p-3 rounded-lg text-center">
            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
            <div className="text-lg font-semibold text-indigo-400">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {statistics.distribution && statistics.distribution.bins && (
        <div>
          <h4 className="text-md font-semibold mb-3">Frequency Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statistics.distribution.bins}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="min"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => value.toFixed(0)}
              />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
