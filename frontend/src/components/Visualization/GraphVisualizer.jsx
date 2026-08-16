const GraphVisualizer = ({ data }) => {
  if (!data) return null;

  // Traversal results (BFS/DFS)
  if (data.result && data.steps) {
    return (
      <div className="graph-viz">
        <div className="graph-header">
          <h4 className="graph-title">{data.algorithm} Traversal</h4>
          <p className="graph-subtitle">
            {data.algorithm === 'BFS'
              ? 'Breadth-First Search — level by level'
              : 'Depth-First Search — branch by branch'}
          </p>
        </div>

        <div className="traversal-section">
          <div className="traversal-section-label">Traversal Order</div>
          <div className="traversal-nodes">
            {data.result.map((node, idx) => (
              <div key={idx} className="traversal-node">
                <span className="traversal-node-idx">{idx + 1}.</span>
                Node {node}
              </div>
            ))}
          </div>
        </div>

        <div className="traversal-section">
          <div className="traversal-section-label">Step Details</div>
          <div className="traversal-steps">
            {data.steps.map((step, idx) => (
              <div
                key={idx}
                className={`traversal-step ${
                  step.type === 'visit' ? 'traversal-step-visit' : 'traversal-step-discover'
                }`}
              >
                {step.type === 'visit' ? '✓ Visit' : '→ Discover'} Node {step.node}
                {step.from !== undefined && (
                  <span className="traversal-step-from"> (from {step.from})</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="traversal-footer">
          <span>Nodes visited: <strong>{data.result.length}</strong></span>
          <span>Steps: <strong>{data.steps.length}</strong></span>
        </div>
      </div>
    );
  }

  // Graph structure
  if (data.nodes && data.edges) {
    return (
      <div className="graph-viz">
        <div className="graph-header">
          <h4 className="graph-title">Similarity Graph</h4>
          <p className="graph-subtitle">
            {data.nodeCount} nodes · {data.edgeCount} edges
          </p>
        </div>

        <div className="graph-cols">
          <div>
            <div className="graph-col-title">Nodes</div>
            <div className="graph-list">
              {data.nodes.slice(0, 25).map((node) => (
                <div key={node.id} className="graph-list-item">
                  <span className="graph-list-label">Node {node.id}</span>
                  <span className="graph-list-meta">deg {node.degree}</span>
                </div>
              ))}
              {data.nodes.length > 25 && (
                <div className="graph-more">+{data.nodes.length - 25} more</div>
              )}
            </div>
          </div>

          <div>
            <div className="graph-col-title">Edges</div>
            <div className="graph-list">
              {data.edges.length === 0 ? (
                <div className="graph-list-item" style={{ justifyContent: 'center' }}>
                  <span className="graph-list-meta">
                    No edges — try lowering the threshold
                  </span>
                </div>
              ) : (
                data.edges.slice(0, 25).map((edge, idx) => (
                  <div key={idx} className="graph-list-item">
                    <span className="graph-list-label">
                      {edge.from} → {edge.to}
                    </span>
                    <span className="graph-list-meta">
                      {typeof edge.weight === 'number' ? edge.weight.toFixed(2) : '—'}
                    </span>
                  </div>
                ))
              )}
              {data.edges.length > 25 && (
                <div className="graph-more">+{data.edges.length - 25} more</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas-empty">
      <p>No graph data</p>
    </div>
  );
};

export default GraphVisualizer;
