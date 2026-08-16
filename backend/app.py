"""
Flask API for Data Insights Explorer
Provides REST endpoints for all data operations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import io
import sys
import os
import math

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from data_structures.dynamic_array import DynamicArray
from data_structures.hash_table import HashTable
from data_structures.bst import BinarySearchTree
from data_structures.avl_tree import AVLTree
from data_structures.graph import Graph
from algorithms.sorting import SortingAlgorithms
from algorithms.searching import SearchingAlgorithms
from utils.statistics import Statistics
from utils.query_engine import QueryEngine
from utils.sample_data import SampleDataGenerator

app = Flask(__name__)
CORS(app)

# Global storage for current dataset
current_data = []
current_structures = {
    'array': None,
    'hash': None,
    'bst': None,
    'avl': None,
    'graph': None
}

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Data Insights Explorer API is running'})

@app.route('/api/upload', methods=['POST'])
def upload_csv():
    """Upload and parse CSV file"""
    global current_data
    
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Read file bytes
        raw_bytes = file.read()
        
        # Try multiple encodings
        content = None
        for encoding in ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252', 'iso-8859-1']:
            try:
                content = raw_bytes.decode(encoding)
                break
            except (UnicodeDecodeError, ValueError):
                continue
        
        if content is None:
            return jsonify({'error': 'Could not decode file. Please save as UTF-8.'}), 400
        
        # Try common delimiters
        df = None
        for sep in [',', ';', '\t', '|']:
            try:
                test_df = pd.read_csv(io.StringIO(content), sep=sep)
                if len(test_df.columns) > 1:
                    df = test_df
                    break
            except Exception:
                continue
        
        # Fallback: default comma
        if df is None:
            df = pd.read_csv(io.StringIO(content))
        
        if df.empty:
            return jsonify({'error': 'CSV file is empty or has no valid data'}), 400
        
        # Replace NaN/inf with None for JSON serialization
        df = df.where(pd.notnull(df), None)
        df = df.replace([float('inf'), float('-inf')], None)
        
        # Convert to list of dicts
        current_data = df.to_dict('records')
        
        # Clean up any remaining NaN values in the records
        for record in current_data:
            for key, value in record.items():
                if isinstance(value, float) and (pd.isna(value) or not math.isfinite(value)):
                    record[key] = None
        
        # Get column info
        columns = list(df.columns)
        dtypes = {col: str(df[col].dtype) for col in columns}
        
        return jsonify({
            'success': True,
            'data': current_data,
            'columns': columns,
            'dtypes': dtypes,
            'count': len(current_data)
        })
    
    except pd.errors.EmptyDataError:
        return jsonify({'error': 'CSV file is empty'}), 400
    except pd.errors.ParserError as e:
        return jsonify({'error': f'Could not parse CSV: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sample/<dataset_type>', methods=['GET'])
def load_sample(dataset_type):
    """Load sample dataset"""
    global current_data
    
    try:
        if dataset_type == 'students':
            current_data = SampleDataGenerator.generate_students(50)
        elif dataset_type == 'sales':
            current_data = SampleDataGenerator.generate_sales(50)
        elif dataset_type == 'sensors':
            current_data = SampleDataGenerator.generate_sensors(50)
        else:
            return jsonify({'error': 'Invalid dataset type'}), 400
        
        columns = list(current_data[0].keys()) if current_data else []
        
        return jsonify({
            'success': True,
            'data': current_data,
            'columns': columns,
            'count': len(current_data)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/structure/<structure_type>', methods=['POST'])
def build_structure(structure_type):
    """Build and visualize data structure"""
    global current_data, current_structures
    
    try:
        key_field = request.json.get('keyField')
        
        if structure_type == 'array':
            array = DynamicArray()
            array.from_list(current_data)
            current_structures['array'] = array
            return jsonify(array.get_visualization_data())
        
        elif structure_type == 'hash':
            hash_table = HashTable()
            hash_table.from_dict_list(current_data, key_field)
            current_structures['hash'] = hash_table
            return jsonify(hash_table.get_visualization_data())
        
        elif structure_type == 'bst':
            bst = BinarySearchTree()
            bst.from_dict_list(current_data, key_field)
            current_structures['bst'] = bst
            return jsonify(bst.get_visualization_data())
        
        elif structure_type == 'avl':
            avl = AVLTree()
            avl.from_dict_list(current_data, key_field)
            current_structures['avl'] = avl
            return jsonify(avl.get_visualization_data())
        
        else:
            return jsonify({'error': 'Invalid structure type'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sort', methods=['POST'])
def sort_data():
    """Sort data using specified algorithm"""
    global current_data
    
    try:
        algorithm = request.json.get('algorithm')
        field = request.json.get('field')
        
        if algorithm == 'bubble':
            result = SortingAlgorithms.bubble_sort(current_data, field)
        elif algorithm == 'merge':
            result = SortingAlgorithms.merge_sort(current_data, field)
        elif algorithm == 'quick':
            result = SortingAlgorithms.quick_sort(current_data, field)
        elif algorithm == 'heap':
            result = SortingAlgorithms.heap_sort(current_data, field)
        else:
            return jsonify({'error': 'Invalid algorithm'}), 400
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search', methods=['POST'])
def search_data():
    """Search data using specified algorithm"""
    global current_data, current_structures
    
    try:
        algorithm = request.json.get('algorithm')
        target = request.json.get('target')
        field = request.json.get('field')
        
        if algorithm == 'linear':
            result = SearchingAlgorithms.linear_search(current_data, target, field)
        elif algorithm == 'binary':
            # Sort data first for binary search
            sorted_data = sorted(current_data, key=lambda x: x.get(field, 0))
            result = SearchingAlgorithms.binary_search(sorted_data, target, field)
        elif algorithm == 'hash':
            if current_structures['hash'] is None:
                return jsonify({'error': 'Hash table not built'}), 400
            result = SearchingAlgorithms.hash_search(current_structures['hash'], target)
        else:
            return jsonify({'error': 'Invalid algorithm'}), 400
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search/compare', methods=['POST'])
def compare_searches():
    """Compare all search algorithms"""
    global current_data, current_structures
    
    try:
        target = request.json.get('target')
        field = request.json.get('field')
        
        # Build hash table if not exists
        if current_structures['hash'] is None and field:
            hash_table = HashTable()
            hash_table.from_dict_list(current_data, field)
            current_structures['hash'] = hash_table
        
        result = SearchingAlgorithms.compare_all(
            current_data,
            target,
            field,
            current_structures['hash']
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/graph/build', methods=['POST'])
def build_graph():
    """Build similarity graph"""
    global current_data, current_structures
    
    try:
        field = request.json.get('field')
        threshold = request.json.get('threshold', 0.7)
        
        graph = Graph.build_similarity_graph(current_data, field, threshold)
        current_structures['graph'] = graph
        
        return jsonify(graph.get_visualization_data())
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/graph/traverse', methods=['POST'])
def traverse_graph():
    """Traverse graph using BFS or DFS"""
    global current_structures
    
    try:
        algorithm = request.json.get('algorithm')
        start_node = request.json.get('startNode', 0)
        
        if current_structures['graph'] is None:
            return jsonify({'error': 'Graph not built'}), 400
        
        graph = current_structures['graph']
        
        if algorithm == 'bfs':
            result = graph.bfs(start_node)
        elif algorithm == 'dfs':
            result = graph.dfs(start_node)
        else:
            return jsonify({'error': 'Invalid algorithm'}), 400
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/statistics', methods=['POST'])
def compute_statistics():
    """Compute statistical analysis"""
    global current_data
    
    try:
        field = request.json.get('field')
        
        result = Statistics.summary(current_data, field)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/query', methods=['POST'])
def execute_query():
    """Execute query on data"""
    global current_data
    
    try:
        query_string = request.json.get('query')
        field = request.json.get('field')
        
        result = QueryEngine.execute_query(current_data, query_string, field)
        
        return jsonify({
            'success': True,
            'result': result,
            'count': len(result) if isinstance(result, list) else None
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_current_data():
    """Get current dataset"""
    global current_data
    
    return jsonify({
        'data': current_data,
        'count': len(current_data)
    })

if __name__ == '__main__':
    # Generate sample data on startup
    print("Generating sample datasets...")
    os.makedirs('data', exist_ok=True)
    SampleDataGenerator.generate_all_samples('data')
    print("Sample datasets created in ./data/")
    
    print("Starting Flask server...")
    app.run(debug=True, port=5000)
