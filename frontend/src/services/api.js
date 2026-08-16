import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dataAPI = {
  // Health check
  healthCheck: () => api.get('/health'),

  // Data upload and loading
  uploadCSV: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  loadSample: (datasetType) => api.get(`/sample/${datasetType}`),

  getCurrentData: () => api.get('/data'),

  // Data structures
  buildStructure: (structureType, keyField) =>
    api.post(`/structure/${structureType}`, { keyField }),

  // Sorting
  sortData: (algorithm, field) =>
    api.post('/sort', { algorithm, field }),

  // Searching
  searchData: (algorithm, target, field) =>
    api.post('/search', { algorithm, target, field }),

  compareSearches: (target, field) =>
    api.post('/search/compare', { target, field }),

  // Graph operations
  buildGraph: (field, threshold = 0.7) =>
    api.post('/graph/build', { field, threshold }),

  traverseGraph: (algorithm, startNode = 0) =>
    api.post('/graph/traverse', { algorithm, startNode }),

  // Statistics
  computeStatistics: (field) =>
    api.post('/statistics', { field }),

  // Query
  executeQuery: (query, field) =>
    api.post('/query', { query, field }),
};

export default api;
