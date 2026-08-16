const ArrayVisualizer = ({ data }) => {
  if (!data || !data.elements) {
    return <div className="text-slate-500">No array data</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold">Dynamic Array</h4>
        <div className="text-sm text-slate-400 space-x-4">
          <span>Size: {data.size}</span>
          <span>Capacity: {data.capacity}</span>
          <span>Load Factor: {data.loadFactor}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {data.elements.map((item, idx) => {
          const displayValue = typeof item === 'object' 
            ? Object.values(item)[0] 
            : item;
          
          return (
            <div
              key={idx}
              className="bg-indigo-600 px-4 py-3 rounded flex flex-col items-center min-w-[60px]"
            >
              <div className="text-xs text-indigo-300">[{idx}]</div>
              <div className="font-semibold">{String(displayValue).slice(0, 10)}</div>
            </div>
          );
        })}
      </div>

      {data.size < data.capacity && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: data.capacity - data.size }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="bg-slate-700/30 border-2 border-dashed border-slate-600 px-4 py-3 rounded flex flex-col items-center min-w-[60px]"
            >
              <div className="text-xs text-slate-600">[{data.size + idx}]</div>
              <div className="text-slate-600">∅</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArrayVisualizer;
