const TreeVisualizer = ({ data }) => {
  if (!data || !data.root) {
    return (
      <div className="canvas-empty">
        <p>No tree data available</p>
        <p className="canvas-empty-hint">Build a BST or AVL tree to see visualization</p>
      </div>
    );
  }

  const renderNode = (node, x = 400, y = 50, level = 0, offsetX = 150) => {
    if (!node) return null;

    const newOffsetX = offsetX * 0.6;
    const verticalSpacing = 70;

    return (
      <g key={`${node.key}-${level}-${x}`}>
        {node.left && (
          <line
            x1={x} y1={y + 20}
            x2={x - offsetX} y2={y + verticalSpacing}
            stroke="var(--border)" strokeWidth="1.5"
          />
        )}
        {node.right && (
          <line
            x1={x} y1={y + 20}
            x2={x + offsetX} y2={y + verticalSpacing}
            stroke="var(--border)" strokeWidth="1.5"
          />
        )}

        <circle cx={x} cy={y} r="20"
          fill="var(--color-violet)" stroke="var(--border)" strokeWidth="1.5" />
        <text x={x} y={y + 4} textAnchor="middle"
          fill="white" fontSize="11" fontWeight="600" fontFamily="var(--font)">
          {String(node.key).slice(0, 8)}
        </text>

        {node.balance !== undefined && (
          <>
            <circle cx={x} cy={y - 26} r="9"
              fill="var(--color-amber)" stroke="var(--surface-0)" strokeWidth="1.5" />
            <text x={x} y={y - 23} textAnchor="middle"
              fill="var(--bg)" fontSize="10" fontWeight="bold" fontFamily="var(--font)">
              {node.balance}
            </text>
          </>
        )}

        {node.left && renderNode(node.left, x - offsetX, y + verticalSpacing, level + 1, newOffsetX)}
        {node.right && renderNode(node.right, x + offsetX, y + verticalSpacing, level + 1, newOffsetX)}
      </g>
    );
  };

  const treeHeight = data.height || 1;
  const svgHeight = Math.max(treeHeight * 70 + 100, 350);

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <div className="graph-header">
        <h4 className="graph-title">
          {data.type === 'avl' ? 'AVL Tree' : 'Binary Search Tree'}
        </h4>
        <p className="graph-subtitle">
          {data.size} nodes · height {data.height} · {data.isBalanced ? 'balanced' : 'unbalanced'}
        </p>
      </div>

      <div style={{ overflow: 'auto', maxHeight: '420px' }}>
        <svg width="800" height={svgHeight} style={{ minWidth: '800px', display: 'block', margin: '0 auto' }}>
          {renderNode(data.root)}
        </svg>
      </div>

      {data.type === 'avl' && (
        <div style={{
          marginTop: '0.75rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'var(--color-amber)', display: 'inline-block'
            }} />
            Balance factor
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'var(--color-violet)', display: 'inline-block'
            }} />
            Node
          </span>
        </div>
      )}
    </div>
  );
};

export default TreeVisualizer;
