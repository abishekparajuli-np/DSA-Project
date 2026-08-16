import { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Upload,
  Database,
  Layout,
  ArrowUpDown,
  Search,
  Network,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';

const Sidebar = () => {
  const {
    data,
    columns,
    loading,
    uploadCSV,
    loadSample,
    buildStructure,
    sortData,
    searchData,
    compareSearches,
    buildGraph,
    traverseGraph,
    computeStatistics,
    executeQuery,
    isAnimating,
    stopAnimation,
    resetVisualization,
  } = useData();

  const [selectedDataset, setSelectedDataset] = useState('students');
  const [selectedStructure, setSelectedStructure] = useState('array');
  const [keyField, setKeyField] = useState('');
  const [sortAlgorithm, setSortAlgorithm] = useState('bubble');
  const [sortField, setSortField] = useState('');
  const [searchAlgorithm, setSearchAlgorithm] = useState('linear');
  const [searchValue, setSearchValue] = useState('');
  const [searchField, setSearchField] = useState('');
  const [graphAlgorithm, setGraphAlgorithm] = useState('bfs');
  const [graphField, setGraphField] = useState('');
  const [statsField, setStatsField] = useState('');
  const [queryText, setQueryText] = useState('');
  const [queryField, setQueryField] = useState('');
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await uploadCSV(file);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
  };

  const handleLoadSample = async () => {
    try {
      const result = await loadSample(selectedDataset);
      if (result.columns.length > 0) {
        setSortField(result.columns[0]);
        setSearchField(result.columns[0]);
        setKeyField(result.columns[0]);
        setGraphField(result.columns[0]);
        setStatsField(result.columns[0]);
        setQueryField(result.columns[0]);
      }
    } catch (err) {
      console.error('Load sample failed:', err);
    }
  };

  const handleBuildStructure = async () => {
    if (!keyField) return;
    try {
      await buildStructure(selectedStructure, keyField);
    } catch (err) {
      console.error('Build structure failed:', err);
    }
  };

  const handleSort = async () => {
    if (!sortField) return;
    try {
      await sortData(sortAlgorithm, sortField);
    } catch (err) {
      console.error('Sort failed:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchValue || !searchField) return;
    try {
      await searchData(searchAlgorithm, searchValue, searchField);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleCompareSearches = async () => {
    if (!searchValue || !searchField) return;
    try {
      await compareSearches(searchValue, searchField);
    } catch (err) {
      console.error('Compare searches failed:', err);
    }
  };

  const handleBuildGraph = async () => {
    if (!graphField) return;
    try {
      await buildGraph(graphField, 0.7);
    } catch (err) {
      console.error('Build graph failed:', err);
    }
  };

  const handleTraverseGraph = async () => {
    try {
      await traverseGraph(graphAlgorithm, 0);
    } catch (err) {
      console.error('Graph traversal failed:', err);
    }
  };

  const handleComputeStats = async () => {
    if (!statsField) return;
    try {
      await computeStatistics(statsField);
    } catch (err) {
      console.error('Statistics failed:', err);
    }
  };

  const handleExecuteQuery = async () => {
    if (!queryText) return;
    try {
      await executeQuery(queryText, queryField);
    } catch (err) {
      console.error('Query failed:', err);
    }
  };

  return (
    <aside className="w-80 bg-slate-800 overflow-y-auto border-r border-slate-700">
      <div className="p-4 space-y-4">
        {/* Data Management */}
        <Section icon={<Database />} title="Data Management">
          <label className="btn btn-primary w-full cursor-pointer">
            <Upload className="w-4 h-4 inline mr-2" />
            Load CSV File
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={loading}
            />
          </label>
          
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="select"
          >
            <option value="students">Student Records</option>
            <option value="sales">Sales Data</option>
            <option value="sensors">Sensor Readings</option>
          </select>
          
          <button
            onClick={handleLoadSample}
            disabled={loading}
            className="btn btn-secondary w-full"
          >
            <Database className="w-4 h-4 inline mr-2" />
            Load Sample Dataset
          </button>
          
          {data.length > 0 && (
            <p className="text-sm text-slate-400 text-center">
              {data.length} records loaded
            </p>
          )}
        </Section>

        {/* Data Structure */}
        {data.length > 0 && (
          <Section icon={<Layout />} title="Data Structure">
            <select
              value={selectedStructure}
              onChange={(e) => setSelectedStructure(e.target.value)}
              className="select"
            >
              <option value="array">Dynamic Array</option>
              <option value="hash">Hash Table</option>
              <option value="bst">Binary Search Tree</option>
              <option value="avl">AVL Tree</option>
            </select>
            
            <select
              value={keyField}
              onChange={(e) => setKeyField(e.target.value)}
              className="select"
            >
              <option value="">Select key field...</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleBuildStructure}
              disabled={loading || !keyField}
              className="btn btn-secondary w-full"
            >
              👁️ Visualize Structure
            </button>
          </Section>
        )}

        {/* Sorting */}
        {data.length > 0 && (
          <Section icon={<ArrowUpDown />} title="Sorting Algorithms">
            <select
              value={sortAlgorithm}
              onChange={(e) => setSortAlgorithm(e.target.value)}
              className="select"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="heap">Heap Sort</option>
            </select>
            
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="select"
            >
              <option value="">Sort by...</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleSort}
              disabled={loading || !sortField}
              className="btn btn-success w-full"
            >
              <Play className="w-4 h-4 inline mr-2" />
              Start Sort Animation
            </button>
          </Section>
        )}

        {/* Searching */}
        {data.length > 0 && (
          <Section icon={<Search />} title="Search Algorithms">
            <select
              value={searchAlgorithm}
              onChange={(e) => setSearchAlgorithm(e.target.value)}
              className="select"
            >
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
              <option value="hash">Hash Lookup</option>
            </select>
            
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search value..."
              className="input"
            />
            
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="select"
            >
              <option value="">Search in...</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleSearch}
              disabled={loading || !searchValue || !searchField}
              className="btn btn-success w-full"
            >
              🔎 Search & Animate
            </button>
            
            <button
              onClick={handleCompareSearches}
              disabled={loading || !searchValue || !searchField}
              className="btn btn-info w-full"
            >
              ⚖️ Compare All Searches
            </button>
          </Section>
        )}

        {/* Graph Analysis */}
        {data.length > 0 && (
          <Section icon={<Network />} title="Graph Analysis">
            <select
              value={graphAlgorithm}
              onChange={(e) => setGraphAlgorithm(e.target.value)}
              className="select"
            >
              <option value="bfs">Breadth-First Search</option>
              <option value="dfs">Depth-First Search</option>
            </select>
            
            <select
              value={graphField}
              onChange={(e) => setGraphField(e.target.value)}
              className="select"
            >
              <option value="">Similarity by...</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleBuildGraph}
              disabled={loading || !graphField}
              className="btn btn-secondary w-full"
            >
              🕸️ Build Relationship Graph
            </button>
            
            <button
              onClick={handleTraverseGraph}
              disabled={loading}
              className="btn btn-success w-full"
            >
              <Play className="w-4 h-4 inline mr-2" />
              Animate Traversal
            </button>
          </Section>
        )}

        {/* Statistics */}
        {data.length > 0 && (
          <Section icon={<BarChart3 />} title="Data Analysis">
            <select
              value={statsField}
              onChange={(e) => setStatsField(e.target.value)}
              className="select"
            >
              <option value="">Analyze field...</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleComputeStats}
              disabled={loading || !statsField}
              className="btn btn-info w-full"
            >
              📐 Compute Statistics
            </button>
          </Section>
        )}

        {/* Animation Controls */}
        {isAnimating && (
          <Section icon={<Play />} title="Animation Controls">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                Speed: {animationSpeed}ms
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
            
            <button
              onClick={stopAnimation}
              className="btn btn-warning w-full"
            >
              <Pause className="w-4 h-4 inline mr-2" />
              Pause
            </button>
            
            <button
              onClick={resetVisualization}
              className="btn btn-danger w-full"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              Reset
            </button>
          </Section>
        )}

        {/* Query Interface */}
        {data.length > 0 && (
          <Section icon={<Search />} title="Query Interface">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="e.g., top 5, range 60-80"
              className="input"
            />
            
            <select
              value={queryField}
              onChange={(e) => setQueryField(e.target.value)}
              className="select"
            >
              <option value="">Query field...</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleExecuteQuery}
              disabled={loading || !queryText}
              className="btn btn-success w-full"
            >
              ⚡ Execute Query
            </button>
          </Section>
        )}
      </div>
    </aside>
  );
};

const Section = ({ icon, title, children }) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-3">
        <div className="text-yellow-400">{icon}</div>
        <h3 className="text-sm font-semibold text-yellow-400">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default Sidebar;
