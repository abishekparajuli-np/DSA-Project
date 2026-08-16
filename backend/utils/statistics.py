"""
Statistical Analysis Module
Computes various statistical measures for data analysis
"""

import math
from collections import Counter

class Statistics:
    
    @staticmethod
    def mean(data, field=None):
        """Calculate mean (average)"""
        values = [item[field] if field else item for item in data]
        numeric_values = [float(v) for v in values if Statistics._is_numeric(v)]
        
        if not numeric_values:
            return None
        
        return sum(numeric_values) / len(numeric_values)
    
    @staticmethod
    def median(data, field=None):
        """Calculate median (middle value)"""
        values = [item[field] if field else item for item in data]
        numeric_values = sorted([float(v) for v in values if Statistics._is_numeric(v)])
        
        if not numeric_values:
            return None
        
        n = len(numeric_values)
        mid = n // 2
        
        if n % 2 == 0:
            return (numeric_values[mid - 1] + numeric_values[mid]) / 2
        else:
            return numeric_values[mid]
    
    @staticmethod
    def mode(data, field=None):
        """Calculate mode (most frequent value)"""
        values = [item[field] if field else item for item in data]
        
        # Convert to strings for counting
        str_values = [str(v) for v in values]
        counter = Counter(str_values)
        
        if not counter:
            return None
        
        most_common = counter.most_common(1)[0]
        
        return {
            'value': most_common[0],
            'count': most_common[1],
            'frequency': most_common[1] / len(values)
        }
    
    @staticmethod
    def standard_deviation(data, field=None):
        """Calculate standard deviation"""
        values = [item[field] if field else item for item in data]
        numeric_values = [float(v) for v in values if Statistics._is_numeric(v)]
        
        if len(numeric_values) < 2:
            return None
        
        mean_val = sum(numeric_values) / len(numeric_values)
        variance = sum((x - mean_val) ** 2 for x in numeric_values) / len(numeric_values)
        
        return math.sqrt(variance)
    
    @staticmethod
    def variance(data, field=None):
        """Calculate variance"""
        values = [item[field] if field else item for item in data]
        numeric_values = [float(v) for v in values if Statistics._is_numeric(v)]
        
        if len(numeric_values) < 2:
            return None
        
        mean_val = sum(numeric_values) / len(numeric_values)
        return sum((x - mean_val) ** 2 for x in numeric_values) / len(numeric_values)
    
    @staticmethod
    def min_max(data, field=None):
        """Calculate minimum and maximum"""
        values = [item[field] if field else item for item in data]
        numeric_values = [float(v) for v in values if Statistics._is_numeric(v)]
        
        if not numeric_values:
            return None
        
        return {
            'min': min(numeric_values),
            'max': max(numeric_values),
            'range': max(numeric_values) - min(numeric_values)
        }
    
    @staticmethod
    def quartiles(data, field=None):
        """Calculate quartiles (Q1, Q2/median, Q3)"""
        values = [item[field] if field else item for item in data]
        numeric_values = sorted([float(v) for v in values if Statistics._is_numeric(v)])
        
        if not numeric_values:
            return None
        
        n = len(numeric_values)
        
        def get_quartile(values, q):
            pos = q * (len(values) - 1)
            floor = int(pos)
            ceil = floor + 1
            
            if ceil >= len(values):
                return values[floor]
            
            return values[floor] + (pos - floor) * (values[ceil] - values[floor])
        
        return {
            'q1': get_quartile(numeric_values, 0.25),
            'q2': get_quartile(numeric_values, 0.50),
            'q3': get_quartile(numeric_values, 0.75),
            'iqr': get_quartile(numeric_values, 0.75) - get_quartile(numeric_values, 0.25)
        }
    
    @staticmethod
    def frequency_distribution(data, field=None, bins=10):
        """Calculate frequency distribution"""
        values = [item[field] if field else item for item in data]
        numeric_values = [float(v) for v in values if Statistics._is_numeric(v)]
        
        if not numeric_values:
            return None
        
        min_val = min(numeric_values)
        max_val = max(numeric_values)
        bin_width = (max_val - min_val) / bins
        
        # Create bins
        bin_edges = [min_val + i * bin_width for i in range(bins + 1)]
        bin_counts = [0] * bins
        
        # Count values in each bin
        for value in numeric_values:
            for i in range(bins):
                if i == bins - 1:  # Last bin includes max
                    if bin_edges[i] <= value <= bin_edges[i + 1]:
                        bin_counts[i] += 1
                        break
                else:
                    if bin_edges[i] <= value < bin_edges[i + 1]:
                        bin_counts[i] += 1
                        break
        
        return {
            'bins': [
                {
                    'min': round(bin_edges[i], 2),
                    'max': round(bin_edges[i + 1], 2),
                    'count': bin_counts[i],
                    'frequency': bin_counts[i] / len(numeric_values)
                }
                for i in range(bins)
            ],
            'total': len(numeric_values)
        }
    
    @staticmethod
    def summary(data, field=None):
        """Generate comprehensive statistical summary"""
        return {
            'count': len(data),
            'mean': Statistics.mean(data, field),
            'median': Statistics.median(data, field),
            'mode': Statistics.mode(data, field),
            'std_dev': Statistics.standard_deviation(data, field),
            'variance': Statistics.variance(data, field),
            'min_max': Statistics.min_max(data, field),
            'quartiles': Statistics.quartiles(data, field),
            'distribution': Statistics.frequency_distribution(data, field)
        }
    
    @staticmethod
    def _is_numeric(value):
        """Check if value is numeric"""
        try:
            float(value)
            return True
        except (ValueError, TypeError):
            return False
