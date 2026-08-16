const TreeVisualizer = ({ data }) => {
  if (!data || !data.root) {
    return (
      <div className="canvas-empty">
        <p>No tree data available</p>
        <p className="canvas-empty-hint">Build a BST or AVL tree to see visualization</p>
      </div>
    );
  }

  // Calculate the width needed at each level
  const calculateTreeBounds = (node, level = 0, bounds = {}) => {
    if (!node) return bounds;
    
    if (!bounds[level]) {
      bounds[level] = 0;
    }
    bounds[level]++;
    
    calculateTreeBounds(node.left, level + 1, bounds);
    calculateTreeBounds(node.right, level + 1, bounds);
    
    return bounds;
  };

  const renderNode = (node, x, y, level = 0, offsetX) => {
    if (!node) return null;

    // More aggressive offset reduction for deeper levels
    const newOffsetX = offsetX * 0.48;
    const verticalSpacing = 90;
    const nodeRadius = 22;

    return (
      <g key={`${node.key}-${level}-${x}`}>
        {node.left && (
          <line
            x1={x} y1={y + nodeRadius}
            x2={x - offsetX} y2={y + verticalSpacing}
            stroke="var(--border)" strokeWidth="1.5"
            opacity="0.5"
          />
        )}
        {node.right && (
          <line
            x1={x} y1={y + nodeRadius}
            x2={x + offsetX} y2={y + verticalSpacing}
            stroke="var(--border)" strokeWidth="1.5"
            opacity="0.5"
          />
        )}

        <circle cx={x} cy={y} r={nodeRadius}
          fill="var(--color-violet)" stroke="var(--border)" strokeWidth="2" />
        <text x={x} y={y + 5} textAnchor="middle"
          fill="white" fontSize="12" fontWeight="600" fontFamily="var(--font)">
          {String(node.key).slice(0, 6)}
        </text>

        {node.balance !== undefined && (
          <>
            <circle cx={x} cy={y - 28} r="10"
              fill="var(--color-amber)" stroke="var(--surface-0)" strokeWidth="1.5" />
            <text x={x} y={y - 24} textAnchor="middle"
              fill="var(--bg)" fontSize="11" fontWeight="bold" fontFamily="var(--font)">
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
  const bounds = calculateTreeBounds(data.root);
  const maxNodesAtLevel = Math.max(...Object.values(bounds));
  
  // Calculate width based on maximum nodes at any level
  const minNodeSpacing = 60;
  const treeWidth = Math.max(maxNodesAtLevel * minNodeSpacing * 2, 1400);
  const svgHeight = Math.max(treeHeight * 90 + 150, 500);
  
  // Initial offset should be enough to fit all leaf nodes
  const initialOffsetX = Math.max(treeWidth / (Math.pow(2, 1.8)), 280);
  const centerX = treeWidth / 2;
  const padding = 50;

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

      <div style={{ 
        overflow: 'auto', 
        maxHeight: '600px', 
        background: 'var(--surface-0)', 
        borderRadius: '8px', 
        border: '1px solid var(--border)',
        padding: '20px'
      }}>
        <svg 
          width={treeWidth + padding * 2} 
          height={svgHeight} 
          style={{ 
            minWidth: treeWidth + padding * 2, 
            display: 'block', 
            margin: '0 auto'
          }}
        >
          <g transform={`translate(${padding}, ${padding})`}>
            {renderNode(data.root, centerX, 40, 0, initialOffsetX)}
          </g>
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
