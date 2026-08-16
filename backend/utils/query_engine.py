"""
Query Engine for Data Exploration
Supports top-N queries, range queries, and filtering
"""

class QueryEngine:
    
    @staticmethod
    def top_n(data, field, n=5, reverse=True):
        """
        Get top N records by field value
        reverse=True for descending (highest first)
        """
        try:
            sorted_data = sorted(
                data,
                key=lambda x: float(x[field]) if field in x else 0,
                reverse=reverse
            )
            return sorted_data[:n]
        except (ValueError, TypeError, KeyError):
            return []
    
    @staticmethod
    def bottom_n(data, field, n=5):
        """Get bottom N records by field value"""
        return QueryEngine.top_n(data, field, n, reverse=False)
    
    @staticmethod
    def range_query(data, field, min_value, max_value):
        """
        Get all records where field value is between min and max (inclusive)
        """
        result = []
        for item in data:
            if field in item:
                try:
                    value = float(item[field])
                    if min_value <= value <= max_value:
                        result.append(item)
                except (ValueError, TypeError):
                    pass
        return result
    
    @staticmethod
    def filter_by(data, field, value, operator='=='):
        """
        Filter data by field value with operator
        Operators: '==', '!=', '>', '<', '>=', '<=',' contains'
        """
        result = []
        
        for item in data:
            if field not in item:
                continue
            
            item_value = item[field]
            
            try:
                if operator == '==':
                    if str(item_value) == str(value):
                        result.append(item)
                elif operator == '!=':
                    if str(item_value) != str(value):
                        result.append(item)
                elif operator == 'contains':
                    if str(value).lower() in str(item_value).lower():
                        result.append(item)
                else:
                    # Numeric operators
                    numeric_item = float(item_value)
                    numeric_value = float(value)
                    
                    if operator == '>':
                        if numeric_item > numeric_value:
                            result.append(item)
                    elif operator == '<':
                        if numeric_item < numeric_value:
                            result.append(item)
                    elif operator == '>=':
                        if numeric_item >= numeric_value:
                            result.append(item)
                    elif operator == '<=':
                        if numeric_item <= numeric_value:
                            result.append(item)
            except (ValueError, TypeError):
                continue
        
        return result
    
    @staticmethod
    def group_by(data, field):
        """
        Group records by field value
        Returns dict with field values as keys and lists of records as values
        """
        groups = {}
        
        for item in data:
            if field in item:
                key = str(item[field])
                if key not in groups:
                    groups[key] = []
                groups[key].append(item)
        
        return groups
    
    @staticmethod
    def aggregate(data, group_field, agg_field, operation='count'):
        """
        Aggregate data by group
        Operations: 'count', 'sum', 'avg', 'min', 'max'
        """
        groups = QueryEngine.group_by(data, group_field)
        result = []
        
        for key, items in groups.items():
            agg_result = {
                'group': key,
                'count': len(items)
            }
            
            if operation != 'count' and agg_field:
                numeric_values = []
                for item in items:
                    if agg_field in item:
                        try:
                            numeric_values.append(float(item[agg_field]))
                        except (ValueError, TypeError):
                            pass
                
                if numeric_values:
                    if operation == 'sum':
                        agg_result['value'] = sum(numeric_values)
                    elif operation == 'avg':
                        agg_result['value'] = sum(numeric_values) / len(numeric_values)
                    elif operation == 'min':
                        agg_result['value'] = min(numeric_values)
                    elif operation == 'max':
                        agg_result['value'] = max(numeric_values)
            
            result.append(agg_result)
        
        return result
    
    @staticmethod
    def parse_query(query_string):
        """
        Parse natural language query strings
        Examples:
        - "top 5" or "top 10 by score"
        - "bottom 3 by price"
        - "range 60-80" or "range 60-80 by marks"
        - "filter status == active"
        - "group by category"
        """
        query_string = query_string.lower().strip()
        
        # Top N query
        if query_string.startswith('top '):
            parts = query_string.split()
            n = int(parts[1])
            field = parts[3] if len(parts) > 3 and parts[2] == 'by' else None
            return {
                'type': 'top_n',
                'n': n,
                'field': field
            }
        
        # Bottom N query
        if query_string.startswith('bottom '):
            parts = query_string.split()
            n = int(parts[1])
            field = parts[3] if len(parts) > 3 and parts[2] == 'by' else None
            return {
                'type': 'bottom_n',
                'n': n,
                'field': field
            }
        
        # Range query
        if query_string.startswith('range '):
            parts = query_string.split()
            range_str = parts[1]
            
            if '-' in range_str:
                min_val, max_val = map(float, range_str.split('-'))
                field = parts[3] if len(parts) > 3 and parts[2] == 'by' else None
                return {
                    'type': 'range',
                    'min': min_val,
                    'max': max_val,
                    'field': field
                }
        
        # Filter query
        if 'filter ' in query_string:
            # Simple parsing: "filter field operator value"
            parts = query_string.replace('filter ', '').split()
            if len(parts) >= 3:
                return {
                    'type': 'filter',
                    'field': parts[0],
                    'operator': parts[1],
                    'value': ' '.join(parts[2:])
                }
        
        # Group by query
        if query_string.startswith('group by '):
            field = query_string.replace('group by ', '').strip()
            return {
                'type': 'group',
                'field': field
            }
        
        return None
    
    @staticmethod
    def execute_query(data, query_string, default_field=None):
        """
        Execute a parsed or string query on data
        """
        if isinstance(query_string, str):
            query = QueryEngine.parse_query(query_string)
            if not query:
                return {'error': 'Could not parse query'}
        else:
            query = query_string
        
        query_type = query.get('type')
        
        if query_type == 'top_n':
            field = query.get('field') or default_field
            if not field:
                return {'error': 'Field required for top_n query'}
            return QueryEngine.top_n(data, field, query.get('n', 5))
        
        elif query_type == 'bottom_n':
            field = query.get('field') or default_field
            if not field:
                return {'error': 'Field required for bottom_n query'}
            return QueryEngine.bottom_n(data, field, query.get('n', 5))
        
        elif query_type == 'range':
            field = query.get('field') or default_field
            if not field:
                return {'error': 'Field required for range query'}
            return QueryEngine.range_query(
                data,
                field,
                query.get('min'),
                query.get('max')
            )
        
        elif query_type == 'filter':
            return QueryEngine.filter_by(
                data,
                query.get('field'),
                query.get('value'),
                query.get('operator', '==')
            )
        
        elif query_type == 'group':
            return QueryEngine.group_by(data, query.get('field'))
        
        return {'error': 'Unknown query type'}
