import { useData } from '../../context/DataContext';
import MetricsDashboard from '../Statistics/MetricsDashboard';
import VisualizationCanvas from '../Visualization/VisualizationCanvas';
import DataTable from '../Visualization/DataTable';
import StatisticsPanel from '../Statistics/StatisticsPanel';
import { AlertCircle, Loader2 } from 'lucide-react';

const MainContent = () => {
  const { data, columns, loading, error, algorithmResult, statistics } = useData();

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-center space-x-3 animate-slide-up">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4 flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          <p className="text-blue-400">Processing...</p>
        </div>
      )}

      {/* Metrics Dashboard */}
      {algorithmResult && <MetricsDashboard result={algorithmResult} />}

      {/* Visualization Canvas */}
      <VisualizationCanvas />

      {/* Sorted Results Display */}
      {algorithmResult?.sorted && algorithmResult?.algorithm?.includes('Sort') && (
        <div className="card animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">✅ Sorted Results</h3>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
              {algorithmResult.sorted.length} records sorted
            </span>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-700 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-yellow-400">#</th>
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-2 text-left text-yellow-400">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {algorithmResult.sorted.slice(0, 20).map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-slate-700 hover:bg-slate-700/50"
                  >
                    <td className="px-4 py-2 text-slate-400">{idx + 1}</td>
                    {columns.map((col) => (
                      <td key={col} className="px-4 py-2">
                        {String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {algorithmResult.sorted.length > 20 && (
            <div className="mt-2 text-center text-sm text-slate-400">
              Showing first 20 of {algorithmResult.sorted.length} sorted records
            </div>
          )}
        </div>
      )}

      {/* Data Table */}
      {data.length > 0 && <DataTable />}

      {/* Statistics Panel */}
      {statistics && <StatisticsPanel statistics={statistics} />}

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="card text-center py-12">
          <div className="text-slate-400 space-y-4">
            <div className="text-6xl">📊</div>
            <h3 className="text-xl font-semibold">No Data Loaded</h3>
            <p className="text-sm">
              Upload a CSV file or load a sample dataset to begin visualization
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
