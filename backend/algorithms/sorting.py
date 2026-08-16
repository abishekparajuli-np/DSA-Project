"""
Sorting Algorithms with Step Tracking for Visualization
All algorithms track comparisons, swaps, and intermediate states
"""

import time
import copy

class SortingAlgorithms:
    
    @staticmethod
    def bubble_sort(arr, key=None):
        """
        Bubble Sort - O(n²)
        Tracks each comparison and swap for visualization
        """
        arr_copy = copy.deepcopy(arr)
        n = len(arr_copy)
        steps = []
        comparisons = 0
        swaps = 0
        start_time = time.time()
        
        for i in range(n):
            for j in range(0, n - i - 1):
                # Get values to compare
                val1 = arr_copy[j][key] if key else arr_copy[j]
                val2 = arr_copy[j + 1][key] if key else arr_copy[j + 1]
                
                comparisons += 1
                steps.append({
                    'type': 'compare',
                    'indices': [j, j + 1],
                    'values': [val1, val2],
                    'array': copy.deepcopy(arr_copy)
                })
                
                if val1 > val2:
                    # Swap
                    arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                    swaps += 1
                    steps.append({
                        'type': 'swap',
                        'indices': [j, j + 1],
                        'array': copy.deepcopy(arr_copy)
                    })
        
        end_time = time.time()
        
        return {
            'algorithm': 'Bubble Sort',
            'sorted': arr_copy,
            'steps': steps,
            'comparisons': comparisons,
            'swaps': swaps,
            'time': (end_time - start_time) * 1000,  # Convert to ms
            'complexity': 'O(n²)',
            'field': key
        }
    
    @staticmethod
    def merge_sort(arr, key=None):
        """
        Merge Sort - O(n log n)
        Tracks recursive divisions and merges
        """
        arr_copy = copy.deepcopy(arr)
        steps = []
        comparisons = [0]
        swaps = [0]
        start_time = time.time()
        
        def merge(left, right, left_idx, right_idx):
            result = []
            i = j = 0
            
            while i < len(left) and j < len(right):
                left_val = left[i][key] if key else left[i]
                right_val = right[j][key] if key else right[j]
                
                comparisons[0] += 1
                steps.append({
                    'type': 'compare',
                    'indices': [left_idx + i, right_idx + j],
                    'values': [left_val, right_val],
                    'array': copy.deepcopy(arr_copy)
                })
                
                if left_val <= right_val:
                    result.append(left[i])
                    i += 1
                else:
                    result.append(right[j])
                    j += 1
                swaps[0] += 1
            
            result.extend(left[i:])
            result.extend(right[j:])
            
            # Update original array
            for idx, val in enumerate(result):
                arr_copy[left_idx + idx] = val
            
            steps.append({
                'type': 'merge',
                'indices': list(range(left_idx, right_idx + len(right))),
                'array': copy.deepcopy(arr_copy)
            })
            
            return result
        
        def merge_sort_helper(arr_slice, start_idx):
            if len(arr_slice) <= 1:
                return arr_slice
            
            mid = len(arr_slice) // 2
            
            steps.append({
                'type': 'divide',
                'indices': list(range(start_idx, start_idx + len(arr_slice))),
                'mid': start_idx + mid,
                'array': copy.deepcopy(arr_copy)
            })
            
            left = merge_sort_helper(arr_slice[:mid], start_idx)
            right = merge_sort_helper(arr_slice[mid:], start_idx + mid)
            
            return merge(left, right, start_idx, start_idx + mid)
        
        sorted_arr = merge_sort_helper(arr_copy, 0)
        end_time = time.time()
        
        return {
            'algorithm': 'Merge Sort',
            'sorted': sorted_arr,
            'steps': steps,
            'comparisons': comparisons[0],
            'swaps': swaps[0],
            'time': (end_time - start_time) * 1000,
            'complexity': 'O(n log n)',
            'field': key
        }
    
    @staticmethod
    def quick_sort(arr, key=None):
        """
        Quick Sort - O(n log n) average
        Tracks pivot selection and partitioning
        """
        arr_copy = copy.deepcopy(arr)
        steps = []
        comparisons = [0]
        swaps = [0]
        start_time = time.time()
        
        def partition(low, high):
            pivot_val = arr_copy[high][key] if key else arr_copy[high]
            i = low - 1
            
            steps.append({
                'type': 'pivot',
                'index': high,
                'value': pivot_val,
                'array': copy.deepcopy(arr_copy)
            })
            
            for j in range(low, high):
                curr_val = arr_copy[j][key] if key else arr_copy[j]
                comparisons[0] += 1
                
                steps.append({
                    'type': 'compare',
                    'indices': [j, high],
                    'values': [curr_val, pivot_val],
                    'array': copy.deepcopy(arr_copy)
                })
                
                if curr_val <= pivot_val:
                    i += 1
                    arr_copy[i], arr_copy[j] = arr_copy[j], arr_copy[i]
                    swaps[0] += 1
                    
                    steps.append({
                        'type': 'swap',
                        'indices': [i, j],
                        'array': copy.deepcopy(arr_copy)
                    })
            
            arr_copy[i + 1], arr_copy[high] = arr_copy[high], arr_copy[i + 1]
            swaps[0] += 1
            
            steps.append({
                'type': 'swap',
                'indices': [i + 1, high],
                'array': copy.deepcopy(arr_copy)
            })
            
            return i + 1
        
        def quick_sort_helper(low, high):
            if low < high:
                pi = partition(low, high)
                quick_sort_helper(low, pi - 1)
                quick_sort_helper(pi + 1, high)
        
        quick_sort_helper(0, len(arr_copy) - 1)
        end_time = time.time()
        
        return {
            'algorithm': 'Quick Sort',
            'sorted': arr_copy,
            'steps': steps,
            'comparisons': comparisons[0],
            'swaps': swaps[0],
            'time': (end_time - start_time) * 1000,
            'complexity': 'O(n log n)',
            'field': key
        }
    
    @staticmethod
    def heap_sort(arr, key=None):
        """
        Heap Sort - O(n log n)
        Tracks heapify operations
        """
        arr_copy = copy.deepcopy(arr)
        n = len(arr_copy)
        steps = []
        comparisons = [0]
        swaps = [0]
        start_time = time.time()
        
        def heapify(n_size, i):
            largest = i
            left = 2 * i + 1
            right = 2 * i + 2
            
            if left < n_size:
                left_val = arr_copy[left][key] if key else arr_copy[left]
                largest_val = arr_copy[largest][key] if key else arr_copy[largest]
                comparisons[0] += 1
                
                if left_val > largest_val:
                    largest = left
            
            if right < n_size:
                right_val = arr_copy[right][key] if key else arr_copy[right]
                largest_val = arr_copy[largest][key] if key else arr_copy[largest]
                comparisons[0] += 1
                
                if right_val > largest_val:
                    largest = right
            
            if largest != i:
                arr_copy[i], arr_copy[largest] = arr_copy[largest], arr_copy[i]
                swaps[0] += 1
                
                steps.append({
                    'type': 'heapify',
                    'indices': [i, largest],
                    'array': copy.deepcopy(arr_copy)
                })
                
                heapify(n_size, largest)
        
        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            heapify(n, i)
        
        steps.append({
            'type': 'heap_built',
            'array': copy.deepcopy(arr_copy)
        })
        
        # Extract elements from heap
        for i in range(n - 1, 0, -1):
            arr_copy[0], arr_copy[i] = arr_copy[i], arr_copy[0]
            swaps[0] += 1
            
            steps.append({
                'type': 'extract',
                'indices': [0, i],
                'array': copy.deepcopy(arr_copy)
            })
            
            heapify(i, 0)
        
        end_time = time.time()
        
        return {
            'algorithm': 'Heap Sort',
            'sorted': arr_copy,
            'steps': steps,
            'comparisons': comparisons[0],
            'swaps': swaps[0],
            'time': (end_time - start_time) * 1000,
            'complexity': 'O(n log n)',
            'field': key
        }
