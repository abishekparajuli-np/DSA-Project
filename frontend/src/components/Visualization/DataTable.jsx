import { useData } from '../../context/DataContext';

const DataTable = () => {
  const { data, columns } = useData();

  if (!data || data.length === 0) return null;

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">Data Records</h3>
        <span className="panel-badge">{data.length} records</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col}>{String(row[col] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 50 && (
        <div className="table-footer">
          Showing first 50 of {data.length} records
        </div>
      )}
    </div>
  );
};

export default DataTable;
