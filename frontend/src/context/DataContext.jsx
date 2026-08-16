import { createContext, useContext, useState, useCallback } from 'react';
import { dataAPI } from '../services/api';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visualizationData, setVisualizationData] = useState(null);
  const [algorithmResult, setAlgorithmResult] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleError = useCallback((err) => {
    const message = err.response?.data?.error || err.message || 'An error occurred';
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, []);

  const uploadCSV = useCallback(async (file) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataAPI.uploadCSV(file);
      setData(response.data.data);
      setColumns(response.data.columns);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const loadSample = useCallback(async (datasetType) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataAPI.loadSample(datasetType);
      setData(response.data.data);
      setColumns(response.data.columns);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const buildStructure = useCallback(async (structureType, keyField) => {
    try {
      setLoading(true);
      setError(null);
      setAlgorithmResult(null); // Reset algorithm result
      setIsAnimating(false); // Stop any animation
      const response = await dataAPI.buildStructure(structureType, keyField);
      setVisualizationData(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const sortData = useCallback(async (algorithm, field) => {
    try {
      setLoading(true);
      setError(null);
      setIsAnimating(true);
      const response = await dataAPI.sortData(algorithm, field);
      setAlgorithmResult(response.data);
      // Update the main data with sorted results
      if (response.data.sorted) {
        setData(response.data.sorted);
      }
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const searchData = useCallback(async (algorithm, target, field) => {
    try {
      setLoading(true);
      setError(null);
      setIsAnimating(true);
      const response = await dataAPI.searchData(algorithm, target, field);
      setAlgorithmResult(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const compareSearches = useCallback(async (target, field) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataAPI.compareSearches(target, field);
      setAlgorithmResult(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const buildGraph = useCallback(async (field, threshold) => {
    try {
      setLoading(true);
      setError(null);
      setAlgorithmResult(null); // Reset algorithm result so graph view shows
      setIsAnimating(false); // Stop any animation
      const response = await dataAPI.buildGraph(field, threshold);
      setVisualizationData(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const traverseGraph = useCallback(async (algorithm, startNode) => {
    try {
      setLoading(true);
      setError(null);
      setIsAnimating(true);
      const response = await dataAPI.traverseGraph(algorithm, startNode);
      setAlgorithmResult(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const computeStatistics = useCallback(async (field) => {
    try {
      setLoading(true);
      setError(null);
      setAlgorithmResult(null); // Reset so stats panel is visible without sort/search overlay
      setIsAnimating(false);
      const response = await dataAPI.computeStatistics(field);
      setStatistics(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const executeQuery = useCallback(async (query, field) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataAPI.executeQuery(query, field);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const resetVisualization = useCallback(() => {
    setVisualizationData(null);
    setAlgorithmResult(null);
    setIsAnimating(false);
  }, []);

  const value = {
    data,
    columns,
    loading,
    error,
    visualizationData,
    algorithmResult,
    statistics,
    isAnimating,
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
    stopAnimation,
    resetVisualization,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
