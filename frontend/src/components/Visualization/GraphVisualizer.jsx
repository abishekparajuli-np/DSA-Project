const GraphVisualizer = ({ data }) => {
  if (!data) return null;

  // For traversal results
  if (data.result && data.steps) {
    return (
      <div className="w-full p-6">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold">{data.algorithm} Traversal</h4>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg mb-4">
          <p className="text-sm">
            <span className="text-slate-400">Traversal Order:</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.result.map((node, idx) => (
              <div
                key={idx}
                className="bg-indigo-600 px-3 py-2 rounded"
              >
                {node}
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-400">
          <p>Total nodes visited: {data.result.length}</p>
          <p>Steps tracked: {data.steps.length}</p>
        </div>
      </div>
    );
  }

  // For graph structure visualization
  if (data.nodes && data.edges) {
    return (
      <div className="w-full p-6">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold">Relationship Graph</h4>
          <p className="text-sm text-slate-400">
            {data.nodeCount} nodes, {data.edgeCount} edges
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold mb-2">Nodes</h5>
            <div className="space-y-1 max-h-64 overflow-auto">
              {data.nodes.slice(0, 20).map((node) => (
                <div
                  key={node.id}
                  className="bg-slate-800 px-3 py-2 rounded text-sm"
                >
                  Node {node.id} (degree: {node.degree})
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Edges</h5>
            <div className="space-y-1 max-h-64 overflow-auto">
              {data.edges.slice(0, 20).map((edge, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 px-3 py-2 rounded text-sm flex justify-between"
                >
                  <span>
                    {edge.from} → {edge.to}
                  </span>
                  <span className="text-slate-400">
                    {edge.weight.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="text-slate-500">No graph data</div>;
};

export default GraphVisualizer;
