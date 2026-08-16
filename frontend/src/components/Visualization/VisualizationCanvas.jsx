import { useEffect, useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import SortAnimator from './SortAnimator';
import SearchAnimator from './SearchAnimator';
import GraphVisualizer from './GraphVisualizer';
import TreeVisualizer from './TreeVisualizer';
import ArrayVisualizer from './ArrayVisualizer';

const VisualizationCanvas = () => {
  const { visualizationData, algorithmResult, isAnimating } = useData();
  const canvasRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Determine what to visualize
  const getVisualizationType = () => {
    if (algorithmResult) {
      if (algorithmResult.algorithm?.includes('Sort')) {
        return 'sort';
      } else if (algorithmResult.algorithm?.includes('Search')) {
        return 'search';
      } else if (algorithmResult.algorithm) {
        return 'graph';
      }
    }
    if (visualizationData) {
      return visualizationData.type;
    }
    return null;
  };

  const visualizationType = getVisualizationType();

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {visualizationType ? getTitle(visualizationType) : 'Visualization Canvas'}
        </h3>
        {algorithmResult && (
          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
            {algorithmResult.algorithm || 'Processing'}
          </span>
        )}
      </div>

      <div
        ref={canvasRef}
        className="bg-slate-900 rounded-lg border-2 border-slate-700 min-h-[500px] flex items-center justify-center relative overflow-auto"
      >
        {visualizationType === 'sort' && (
          <SortAnimator result={algorithmResult} />
        )}
        {visualizationType === 'search' && (
          <SearchAnimator result={algorithmResult} />
        )}
        {visualizationType === 'graph' && (
          <GraphVisualizer data={algorithmResult || visualizationData} />
        )}
        {(visualizationType === 'bst' || visualizationType === 'avl') && (
          <TreeVisualizer data={visualizationData} />
        )}
        {visualizationType === 'array' && (
          <ArrayVisualizer data={visualizationData} />
        )}
        {visualizationType === 'hashtable' && (
          <HashTableVisualizer data={visualizationData} />
        )}
        {!visualizationType && (
          <div className="text-slate-500 text-center">
            <div className="text-4xl mb-2">🎨</div>
            <p>Visualizations will appear here</p>
            <p className="text-sm mt-2">
              Select an operation from the sidebar to begin
            </p>
          </div>
        )}
      </div>

      {algorithmResult?.steps && (
        <div className="mt-4 text-sm text-slate-400 text-center">
          <p>
            Step {currentStep} of {algorithmResult.steps.length}
          </p>
        </div>
      )}
    </div>
  );
};

const getTitle = (type) => {
  const titles = {
    sort: 'Sorting Algorithm Visualization',
    search: 'Search Algorithm Visualization',
    graph: 'Graph Traversal Visualization',
    bst: 'Binary Search Tree',
    avl: 'AVL Tree',
    array: 'Dynamic Array',
    hashtable: 'Hash Table',
  };
  return titles[type] || 'Visualization';
};

// Simple Hash Table Visualizer
const HashTableVisualizer = ({ data }) => {
  if (!data || !data.buckets) return null;

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <div className="space-y-2">
        {data.buckets.slice(0, 16).map((bucket) => (
          <div
            key={bucket.index}
            className="flex items-center space-x-2 bg-slate-800 p-2 rounded"
          >
            <div className="w-12 text-center text-yellow-400 font-mono">
              [{bucket.index}]
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {bucket.entries.length === 0 ? (
                <div className="text-slate-600">empty</div>
              ) : (
                bucket.entries.map((entry, idx) => (
                  <div
                    key={idx}
                    className="bg-indigo-600 px-3 py-1 rounded text-sm"
                  >
                    {String(entry.key)}
                  </div>
                ))
              )}
            </div>
            <div className="text-slate-500 text-sm">
              {bucket.size} item{bucket.size !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-slate-400">
        Load Factor: {data.loadFactor} | Collisions: {data.collisions}
      </div>
    </div>
  );
};

export default VisualizationCanvas;
