import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import {
  Upload,
  Database,
  Layers,
  ArrowUpDown,
  Search,
  Network,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  ChevronDown,
  ChevronRight,
  Eye,
  Zap,
  GitBranch,
  SlidersHorizontal,
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
  const [graphThreshold, setGraphThreshold] = useState(0.5);
  const [statsField, setStatsField] = useState('');
  const [queryText, setQueryText] = useState('');
  const [queryField, setQueryField] = useState('');

  // Auto-detect numeric columns from the data
  const numericColumns = useMemo(() => {
    if (!data || data.length === 0 || !columns || columns.length === 0) return [];
    const sample = data[0];
    return columns.filter((col) => {
      const val = sample[col];
      return val !== null && val !== undefined && !isNaN(parseFloat(val)) && isFinite(val);
    });
  }, [data, columns]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const result = await uploadCSV(file);
        if (result.columns && result.columns.length > 0 && result.data && result.data.length > 0) {
          // Auto-detect numeric columns from uploaded data
          const sample = result.data[0];
          const numCols = result.columns.filter((col) => {
            const val = sample[col];
            return val !== null && val !== undefined && !isNaN(parseFloat(val)) && isFinite(val);
          });
          const defaultNumeric = numCols[0] || result.columns[0];

          setKeyField(result.columns[0]);
          setSortField(defaultNumeric);
          setSearchField(result.columns[0]);
          setGraphField(defaultNumeric);
          setStatsField(defaultNumeric);
          setQueryField(defaultNumeric);
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
    // Reset file input so the same file can be re-uploaded
    e.target.value = '';
  };

  const handleLoadSample = async () => {
    try {
      const result = await loadSample(selectedDataset);
      if (result.columns.length > 0) {
        // Detect numeric columns from loaded data
        const sample = result.data[0];
        const numCols = result.columns.filter((col) => {
          const val = sample[col];
          return val !== null && val !== undefined && !isNaN(parseFloat(val)) && isFinite(val);
        });
        const defaultNumeric = numCols[0] || result.columns[0];

        setKeyField(result.columns[0]);
        setSortField(defaultNumeric);
        setSearchField(result.columns[0]);
        setGraphField(defaultNumeric);
        setStatsField(defaultNumeric);
        setQueryField(defaultNumeric);
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
      await buildGraph(graphField, graphThreshold);
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
    <aside className="sidebar">
      <div className="sidebar-inner">
        {/* Data Source */}
        <Section icon={<Database size={16} />} title="Data Source" defaultOpen>
          <label className="sidebar-btn sidebar-btn-outline">
            <Upload size={14} />
            <span>Import CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={loading}
            />
          </label>

          <div className="sidebar-divider-text">or load sample</div>

          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="sidebar-select"
          >
            <option value="students">Student Records</option>
            <option value="sales">Sales Data</option>
            <option value="sensors">Sensor Readings</option>
          </select>

          <button
            onClick={handleLoadSample}
            disabled={loading}
            className="sidebar-btn sidebar-btn-primary"
          >
            <Database size={14} />
            <span>Load Dataset</span>
          </button>

          {data?.length > 0 && (
            <div className="sidebar-badge">
              <span className="sidebar-badge-dot" />
              {data.length} records loaded
            </div>
          )}
        </Section>

        {/* Data Structures */}
        {data?.length > 0 && (
          <Section icon={<Layers size={16} />} title="Data Structures">
            <select
              value={selectedStructure}
              onChange={(e) => setSelectedStructure(e.target.value)}
              className="sidebar-select"
            >
              <option value="array">Dynamic Array</option>
              <option value="hash">Hash Table</option>
              <option value="bst">Binary Search Tree</option>
              <option value="avl">AVL Tree</option>
            </select>

            <select
              value={keyField}
              onChange={(e) => setKeyField(e.target.value)}
              className="sidebar-select"
            >
              <option value="">Key field...</option>
              {columns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <button
              onClick={handleBuildStructure}
              disabled={loading || !keyField}
              className="sidebar-btn sidebar-btn-secondary"
            >
              <Eye size={14} />
              <span>Visualize</span>
            </button>
          </Section>
        )}

        {/* Sorting */}
        {data?.length > 0 && (
          <Section icon={<ArrowUpDown size={16} />} title="Sorting">
            <select
              value={sortAlgorithm}
              onChange={(e) => setSortAlgorithm(e.target.value)}
              className="sidebar-select"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="heap">Heap Sort</option>
            </select>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="sidebar-select"
            >
              <option value="">Sort by...</option>
              {columns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <button
              onClick={handleSort}
              disabled={loading || !sortField}
              className="sidebar-btn sidebar-btn-accent"
            >
              <Play size={14} />
              <span>Run Sort</span>
            </button>
          </Section>
        )}

        {/* Searching */}
        {data?.length > 0 && (
          <Section icon={<Search size={16} />} title="Search">
            <select
              value={searchAlgorithm}
              onChange={(e) => setSearchAlgorithm(e.target.value)}
              className="sidebar-select"
            >
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
              <option value="hash">Hash Lookup</option>
            </select>

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Value to find..."
              className="sidebar-input"
            />

            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="sidebar-select"
            >
              <option value="">Search in...</option>
              {columns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              disabled={loading || !searchValue || !searchField}
              className="sidebar-btn sidebar-btn-accent"
            >
              <Search size={14} />
              <span>Search</span>
            </button>

            <button
              onClick={handleCompareSearches}
              disabled={loading || !searchValue || !searchField}
              className="sidebar-btn sidebar-btn-outline"
            >
              <Zap size={14} />
              <span>Compare All</span>
            </button>
          </Section>
        )}

        {/* Graph Analysis */}
        {data?.length > 0 && (
          <Section icon={<Network size={16} />} title="Graph Analysis">
            <select
              value={graphField}
              onChange={(e) => setGraphField(e.target.value)}
              className="sidebar-select"
            >
              <option value="">Similarity field...</option>
              {numericColumns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <div className="sidebar-slider-group">
              <div className="sidebar-slider-label">
                <span>Threshold</span>
                <span className="sidebar-slider-value">{graphThreshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.95"
                step="0.05"
                value={graphThreshold}
                onChange={(e) => setGraphThreshold(parseFloat(e.target.value))}
                className="sidebar-range"
              />
              <div className="sidebar-slider-hints">
                <span>More edges</span>
                <span>Fewer edges</span>
              </div>
            </div>

            <button
              onClick={handleBuildGraph}
              disabled={loading || !graphField}
              className="sidebar-btn sidebar-btn-secondary"
            >
              <GitBranch size={14} />
              <span>Build Graph</span>
            </button>

            <div className="sidebar-inline-group">
              <select
                value={graphAlgorithm}
                onChange={(e) => setGraphAlgorithm(e.target.value)}
                className="sidebar-select"
              >
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
              </select>
              <button
                onClick={handleTraverseGraph}
                disabled={loading}
                className="sidebar-btn sidebar-btn-accent"
                style={{ flex: 1 }}
              >
                <Play size={14} />
                <span>Traverse</span>
              </button>
            </div>
          </Section>
        )}

        {/* Statistics */}
        {data?.length > 0 && (
          <Section icon={<BarChart3 size={16} />} title="Statistics">
            <select
              value={statsField}
              onChange={(e) => setStatsField(e.target.value)}
              className="sidebar-select"
            >
              <option value="">Analyze field...</option>
              {numericColumns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <button
              onClick={handleComputeStats}
              disabled={loading || !statsField}
              className="sidebar-btn sidebar-btn-secondary"
            >
              <BarChart3 size={14} />
              <span>Compute</span>
            </button>
          </Section>
        )}

        {/* Animation Controls */}
        {isAnimating && (
          <Section icon={<SlidersHorizontal size={16} />} title="Controls" defaultOpen>
            <div className="sidebar-btn-row">
              <button onClick={stopAnimation} className="sidebar-btn sidebar-btn-warn">
                <Pause size={14} />
                <span>Pause</span>
              </button>
              <button onClick={resetVisualization} className="sidebar-btn sidebar-btn-danger">
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </Section>
        )}

        {/* Query */}
        {data?.length > 0 && (
          <Section icon={<Terminal size={16} />} title="Query">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="e.g. top 5, range 60-80"
              className="sidebar-input"
            />

            <select
              value={queryField}
              onChange={(e) => setQueryField(e.target.value)}
              className="sidebar-select"
            >
              <option value="">Field...</option>
              {columns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <button
              onClick={handleExecuteQuery}
              disabled={loading || !queryText}
              className="sidebar-btn sidebar-btn-accent"
            >
              <Zap size={14} />
              <span>Execute</span>
            </button>
          </Section>
        )}
      </div>
    </aside>
  );
};

const Section = ({ icon, title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`sidebar-section ${open ? 'sidebar-section-open' : ''}`}>
      <button
        className="sidebar-section-header"
        onClick={() => setOpen(!open)}
      >
        <div className="sidebar-section-left">
          {icon}
          <span>{title}</span>
        </div>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && <div className="sidebar-section-body">{children}</div>}
    </div>
  );
};

export default Sidebar;
