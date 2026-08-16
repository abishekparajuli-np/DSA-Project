"""
Searching Algorithms with Step Tracking for Visualization
All algorithms track comparisons and search progression
"""

import time
import copy

class SearchingAlgorithms:
    
    @staticmethod
    def linear_search(arr, target, key=None):
        """
        Linear Search - O(n)
        Sequentially checks each element
        """
        steps = []
        comparisons = 0
        start_time = time.time()
        found_index = -1
        
        # Convert target for comparison
        try:
            target_num = float(target)
            use_numeric = True
        except (ValueError, TypeError):
            target_str = str(target)
            use_numeric = False
        
        for i, item in enumerate(arr):
            value = item[key] if key else item
            comparisons += 1
            
            steps.append({
                'type': 'compare',
                'index': i,
                'value': value,
                'target': target,
                'found': False
            })
            
            # Try numeric comparison first, then string
            match = False
            if use_numeric:
                try:
                    match = float(value) == target_num
                except (ValueError, TypeError):
                    match = str(value) == str(target)
            else:
                match = str(value).lower() == target_str.lower()
            
            if match:
                found_index = i
                steps.append({
                    'type': 'found',
                    'index': i,
                    'value': value,
                    'target': target,
                    'found': True
                })
                break
        
        end_time = time.time()
        
        return {
            'algorithm': 'Linear Search',
            'found': found_index != -1,
            'index': found_index,
            'value': arr[found_index] if found_index != -1 else None,
            'steps': steps,
            'comparisons': comparisons,
            'time': (end_time - start_time) * 1000,
            'complexity': 'O(n)'
        }
    
    @staticmethod
    def binary_search(arr, target, key=None):
        """
        Binary Search - O(log n)
        Requires sorted array
        """
        steps = []
        comparisons = 0
        start_time = time.time()
        
        # Convert target for comparison
        try:
            target_num = float(target)
            use_numeric = True
        except (ValueError, TypeError):
            target_str = str(target)
            use_numeric = False
        
        left = 0
        right = len(arr) - 1
        found_index = -1
        
        while left <= right:
            mid = (left + right) // 2
            mid_value = arr[mid][key] if key else arr[mid]
            comparisons += 1
            
            steps.append({
                'type': 'compare',
                'left': left,
                'right': right,
                'mid': mid,
                'value': mid_value,
                'target': target,
                'found': False
            })
            
            # Compare with type handling
            match = False
            less_than = False
            
            if use_numeric:
                try:
                    val_num = float(mid_value)
                    match = val_num == target_num
                    less_than = val_num < target_num
                except (ValueError, TypeError):
                    match = str(mid_value) == str(target)
                    less_than = str(mid_value) < str(target)
            else:
                match = str(mid_value).lower() == target_str.lower()
                less_than = str(mid_value).lower() < target_str.lower()
            
            if match:
                found_index = mid
                steps.append({
                    'type': 'found',
                    'index': mid,
                    'value': mid_value,
                    'target': target,
                    'found': True
                })
                break
            elif less_than:
                left = mid + 1
                steps.append({
                    'type': 'move_right',
                    'new_left': left,
                    'right': right
                })
            else:
                right = mid - 1
                steps.append({
                    'type': 'move_left',
                    'left': left,
                    'new_right': right
                })
        
        end_time = time.time()
        
        return {
            'algorithm': 'Binary Search',
            'found': found_index != -1,
            'index': found_index,
            'value': arr[found_index] if found_index != -1 else None,
            'steps': steps,
            'comparisons': comparisons,
            'time': (end_time - start_time) * 1000,
            'complexity': 'O(log n)'
        }
    
    @staticmethod
    def hash_search(hash_table, target_key):
        """
        Hash Table Lookup - O(1) average
        Uses hash table for constant time lookup
        """
        steps = []
        comparisons = 0
        start_time = time.time()
        
        # Calculate hash
        hash_index = hash_table.get_hash_index(target_key)
        steps.append({
            'type': 'hash',
            'key': target_key,
            'hash_index': hash_index
        })
        
        # Search in bucket
        found_value = None
        bucket = hash_table.buckets[hash_index]
        
        for key, value in bucket:
            comparisons += 1
            steps.append({
                'type': 'compare',
                'bucket_index': hash_index,
                'key': key,
                'target_key': target_key
            })
            
            if key == target_key:
                found_value = value
                steps.append({
                    'type': 'found',
                    'key': key,
                    'value': value,
                    'found': True
                })
                break
        
        end_time = time.time()
        
        return {
            'algorithm': 'Hash Lookup',
            'found': found_value is not None,
            'key': target_key,
            'value': found_value,
            'hash_index': hash_index,
            'steps': steps,
            'comparisons': comparisons,
            'time': (end_time - start_time) * 1000,
            'complexity': 'O(1) average'
        }
    
    @staticmethod
    def compare_all(arr, target, key=None, hash_table=None):
        """
        Compare all search algorithms
        Returns results from Linear, Binary, and Hash (if available)
        """
        results = {}
        
        # Linear Search
        results['linear'] = SearchingAlgorithms.linear_search(arr, target, key)
        
        # Binary Search (on sorted array)
        sorted_arr = sorted(arr, key=lambda x: x[key] if key else x)
        results['binary'] = SearchingAlgorithms.binary_search(sorted_arr, target, key)
        
        # Hash Search (if hash table provided)
        if hash_table:
            results['hash'] = SearchingAlgorithms.hash_search(hash_table, target)
        
        # Summary comparison — compute from algorithm keys only, before adding summary
        algo_keys = [k for k in results.keys()]
        results['summary'] = {
            'fastest': min(algo_keys, key=lambda k: results[k].get('time', float('inf'))),
            'fewest_comparisons': min(algo_keys, key=lambda k: results[k].get('comparisons', float('inf'))),
            'all_found': all(results[k].get('found', False) for k in algo_keys)
        }
        
        return results
