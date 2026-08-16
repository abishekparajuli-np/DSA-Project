const TreeVisualizer = ({ data }) => {
  if (!data || !data.root) {
    return (
      <div className="w-full p-6 text-center text-slate-500">
        <div className="text-4xl mb-2">🌳</div>
        <p>No tree data available</p>
        <p className="text-sm mt-2">Build a BST or AVL tree to see visualization</p>
      </div>
    );
  }

  const renderNode = (node, x = 400, y = 50, level = 0, offsetX = 150) => {
    if (!node) return null;

    const newOffsetX = offsetX * 0.6;
    const verticalSpacing = 70;

    return (
      <g key={`${node.key}-${level}-${x}`}>
        {/* Lines to children */}
        {node.left && (
          <line
            x1={x}
            y1={y + 20}
            x2={x - offsetX}
            y2={y + verticalSpacing}
            stroke="#64748b"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y + 20}
            x2={x + offsetX}
            y2={y + verticalSpacing}
            stroke="#64748b"
            strokeWidth="2"
          />
        )}

        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r="22"
          fill="#4f46e5"
          stroke="#818cf8"
          strokeWidth="2"
        />

        {/* Node key text */}
        <text
          x={x}
          y={y + 4}
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="600"
        >
          {String(node.key).slice(0, 8)}
        </text>

        {/* Balance factor for AVL trees */}
        {node.balance !== undefined && (
          <>
            <circle
              cx={x}
              cy={y - 28}
              r="10"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            <text
              x={x}
              y={y - 25}
              textAnchor="middle"
              fill="#1e293b"
              fontSize="11"
              fontWeight="bold"
            >
              {node.balance}
            </text>
          </>
        )}

        {/* Render children */}
        {node.left && renderNode(node.left, x - offsetX, y + verticalSpacing, level + 1, newOffsetX)}
        {node.right && renderNode(node.right, x + offsetX, y + verticalSpacing, level + 1, newOffsetX)}
      </g>
    );
  };

  const treeHeight = data.height || 1;
  const svgHeight = Math.max(treeHeight * 70 + 100, 350);

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="mb-3 text-center bg-slate-800 py-3 rounded-t-lg border border-slate-700">
        <h4 className="text-lg font-semibold text-indigo-400">
          {data.type === 'avl' ? '🌳 AVL Tree (Self-Balancing)' : '🌳 Binary Search Tree'}
        </h4>
        <div className="text-sm text-slate-400 mt-1 space-x-4">
          <span className="inline-flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Nodes: {data.size}
          </span>
          <span className="inline-flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            Height: {data.height}
          </span>
          <span className="inline-flex items-center">
            <span className={`w-2 h-2 rounded-full mr-1 ${data.isBalanced ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {data.isBalanced ? 'Balanced ✓' : 'Unbalanced ✗'}
          </span>
        </div>
      </div>

      {/* Tree Container with Frame */}
      <div className="border-2 border-slate-700 rounded-b-lg bg-slate-900 overflow-auto" style={{ maxHeight: '500px' }}>
        <div className="flex justify-center p-4">
          <svg 
            width="800" 
            height={svgHeight} 
            className="mx-auto"
            style={{ minWidth: '800px' }}
          >
            {/* Background grid (optional) */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Render tree */}
            {renderNode(data.root)}
          </svg>
        </div>
      </div>

      {/* Legend */}
      {data.type === 'avl' && (
        <div className="mt-3 text-xs text-slate-400 text-center bg-slate-800 py-2 rounded-lg border border-slate-700">
          <span className="inline-flex items-center mr-4">
            <span className="w-3 h-3 bg-fbbf24 rounded-full mr-1 border border-f59e0b"></span>
            Yellow circles show balance factors
          </span>
          <span className="inline-flex items-center">
            <span className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></span>
            Purple circles are tree nodes
          </span>
        </div>
      )}
    </div>
  );
};

export default TreeVisualizer;
