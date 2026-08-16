import { useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import SortAnimator from './SortAnimator';
import SearchAnimator from './SearchAnimator';
import GraphVisualizer from './GraphVisualizer';
import TreeVisualizer from './TreeVisualizer';
import ArrayVisualizer from './ArrayVisualizer';
import { Palette } from 'lucide-react';

const VisualizationCanvas = () => {
  const { visualizationData, algorithmResult, isAnimating } = useData();
  const canvasRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  const getVisualizationType = () => {
    if (algorithmResult) {
      const algo = algorithmResult.algorithm || '';
      if (algo.includes('Sort')) return 'sort';
      if (algo.includes('Search') || algo.includes('Lookup')) return 'search';
      if (algo === 'BFS' || algo === 'DFS') return 'graph_traversal';
      if (algorithmResult.linear || algorithmResult.binary || algorithmResult.hash) return 'search';
    }
    if (visualizationData) return visualizationData.type;
    return null;
  };

  const visualizationType = getVisualizationType();

  const typeLabels = {
    sort: 'Sorting',
    search: 'Search',
    graph: 'Graph',
    graph_traversal: 'Traversal',
    bst: 'BST',
    avl: 'AVL Tree',
    array: 'Array',
    hashtable: 'Hash Table',
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">Visualization</h3>
        {algorithmResult?.algorithm && (
          <span className="panel-badge panel-badge-accent">{algorithmResult.algorithm}</span>
        )}
        {visualizationType && !algorithmResult?.algorithm && (
          <span className="panel-badge">{typeLabels[visualizationType] || ''}</span>
        )}
      </div>

      <div ref={canvasRef} className="canvas-area">
        {visualizationType === 'sort' && <SortAnimator result={algorithmResult} />}
        {visualizationType === 'search' && <SearchAnimator result={algorithmResult} />}
        {(visualizationType === 'graph_traversal' || visualizationType === 'graph') && (
          <GraphVisualizer data={algorithmResult || visualizationData} />
        )}
        {(visualizationType === 'bst' || visualizationType === 'avl') && (
          <TreeVisualizer data={visualizationData} />
        )}
        {visualizationType === 'array' && <ArrayVisualizer data={visualizationData} />}
        {visualizationType === 'hashtable' && <HashTableVisualizer data={visualizationData} />}
        {!visualizationType && (
          <div className="canvas-empty">
            <Palette size={36} className="canvas-empty-icon" />
            <p>Visualizations appear here</p>
            <p className="canvas-empty-hint">Select an operation from the sidebar</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HashTableVisualizer = ({ data }) => {
  if (!data || !data.buckets) return null;

  return (
    <div className="ht-viz">
      <div className="ht-buckets">
        {data.buckets.slice(0, 16).map((bucket) => (
          <div key={bucket.index} className="ht-row">
            <div className="ht-index">[{bucket.index}]</div>
            <div className="ht-entries">
              {bucket.entries.length === 0 ? (
                <span className="ht-empty">empty</span>
              ) : (
                bucket.entries.map((entry, idx) => (
                  <span key={idx} className="ht-entry">{String(entry.key)}</span>
                ))
              )}
            </div>
            <div className="ht-count">{bucket.size}</div>
          </div>
        ))}
      </div>
      <div className="ht-footer">
        Load Factor: {data.loadFactor} · Collisions: {data.collisions}
      </div>
    </div>
  );
};

export default VisualizationCanvas;
