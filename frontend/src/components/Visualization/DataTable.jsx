import { useData } from '../../context/DataContext';

const DataTable = () => {
  const { data, columns } = useData();

  if (!data || data.length === 0) return null;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">📋 Data Records</h3>
        <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
          {data.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-yellow-400 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3">
                    {String(row[col] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 50 && (
        <div className="mt-4 text-center text-sm text-slate-400">
          Showing first 50 of {data.length} records
        </div>
      )}
    </div>
  );
};

export default DataTable;
