import { useData } from '../../context/DataContext';
import MetricsDashboard from '../Statistics/MetricsDashboard';
import VisualizationCanvas from '../Visualization/VisualizationCanvas';
import DataTable from '../Visualization/DataTable';
import StatisticsPanel from '../Statistics/StatisticsPanel';
import { AlertCircle, Loader2, BarChart3 } from 'lucide-react';

const MainContent = () => {
  const { data, columns, loading, error, algorithmResult, statistics } = useData();

  return (
    <main className="main-content">
      {/* Error Alert */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={16} />
          <p>{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="alert alert-info">
          <Loader2 size={16} className="animate-spin" />
          <p>Processing...</p>
        </div>
      )}

      {/* Metrics */}
      {algorithmResult && <MetricsDashboard result={algorithmResult} />}

      {/* Visualization */}
      <VisualizationCanvas />

      {/* Sorted Results */}
      {algorithmResult?.sorted && algorithmResult?.algorithm?.includes('Sort') && (
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Sorted Results</h3>
            <span className="panel-badge">{algorithmResult.sorted.length} records</span>
          </div>
          <div className="table-wrapper" style={{ maxHeight: '280px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {algorithmResult.sorted.slice(0, 20).map((row, idx) => (
                  <tr key={idx}>
                    <td className="text-muted">{idx + 1}</td>
                    {columns.map((col) => (
                      <td key={col}>{String(row[col] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {algorithmResult.sorted.length > 20 && (
            <div className="table-footer">
              Showing 20 of {algorithmResult.sorted.length} records
            </div>
          )}
        </div>
      )}

      {/* Data Table */}
      {data?.length > 0 && <DataTable />}

      {/* Statistics */}
      {statistics && <StatisticsPanel statistics={statistics} />}

      {/* Empty State */}
      {(!data || data.length === 0) && !loading && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <BarChart3 size={40} />
          </div>
          <h3>No Data Loaded</h3>
          <p>Upload a CSV file or load a sample dataset from the sidebar to begin.</p>
        </div>
      )}
    </main>
  );
};

export default MainContent;
