"""
Graph - Adjacency list implementation for relationship analysis
Supports BFS and DFS traversals
"""

from collections import deque

class Graph:
    def __init__(self, directed=False):
        self.adj_list = {}
        self.directed = directed
        self.node_data = {}
    
    def add_node(self, node, data=None):
        """Add a node to the graph"""
        if node not in self.adj_list:
            self.adj_list[node] = []
            self.node_data[node] = data
    
    def add_edge(self, from_node, to_node, weight=1):
        """Add an edge between two nodes"""
        self.add_node(from_node)
        self.add_node(to_node)
        
        self.adj_list[from_node].append((to_node, weight))
        
        if not self.directed:
            self.adj_list[to_node].append((from_node, weight))
    
    def get_neighbors(self, node):
        """Get all neighbors of a node"""
        return self.adj_list.get(node, [])
    
    def bfs(self, start_node):
        """Breadth-First Search traversal with step tracking"""
        if start_node not in self.adj_list:
            return []
        
        visited = set()
        queue = deque([start_node])
        steps = []
        result = []
        
        visited.add(start_node)
        
        while queue:
            node = queue.popleft()
            result.append(node)
            
            steps.append({
                'type': 'visit',
                'node': node,
                'data': self.node_data.get(node),
                'visited': list(visited),
                'queue': list(queue)
            })
            
            for neighbor, weight in self.adj_list[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    steps.append({
                        'type': 'discover',
                        'node': neighbor,
                        'from': node,
                        'visited': list(visited),
                        'queue': list(queue)
                    })
        
        return {
            'result': result,
            'steps': steps,
            'algorithm': 'BFS'
        }
    
    def dfs(self, start_node):
        """Depth-First Search traversal with step tracking"""
        if start_node not in self.adj_list:
            return []
        
        visited = set()
        steps = []
        result = []
        
        def dfs_helper(node):
            visited.add(node)
            result.append(node)
            
            steps.append({
                'type': 'visit',
                'node': node,
                'data': self.node_data.get(node),
                'visited': list(visited),
                'stack': result.copy()
            })
            
            for neighbor, weight in self.adj_list[node]:
                if neighbor not in visited:
                    steps.append({
                        'type': 'discover',
                        'node': neighbor,
                        'from': node,
                        'visited': list(visited),
                        'stack': result.copy()
                    })
                    dfs_helper(neighbor)
        
        dfs_helper(start_node)
        
        return {
            'result': result,
            'steps': steps,
            'algorithm': 'DFS'
        }
    
    def get_all_nodes(self):
        """Get all nodes in the graph"""
        return list(self.adj_list.keys())
    
    def get_all_edges(self):
        """Get all edges in the graph"""
        edges = []
        seen = set()
        
        for node in self.adj_list:
            for neighbor, weight in self.adj_list[node]:
                if self.directed:
                    edges.append({
                        'from': node,
                        'to': neighbor,
                        'weight': weight
                    })
                else:
                    # Avoid duplicates for undirected graphs
                    edge_id = tuple(sorted([node, neighbor]))
                    if edge_id not in seen:
                        edges.append({
                            'from': node,
                            'to': neighbor,
                            'weight': weight
                        })
                        seen.add(edge_id)
        
        return edges
    
    def clear(self):
        """Clear the graph"""
        self.adj_list = {}
        self.node_data = {}
    
    def get_visualization_data(self):
        """Get visualization data"""
        return {
            'type': 'graph',
            'directed': self.directed,
            'nodes': [
                {
                    'id': node,
                    'data': self.node_data.get(node),
                    'degree': len(self.adj_list[node])
                }
                for node in self.adj_list
            ],
            'edges': self.get_all_edges(),
            'nodeCount': len(self.adj_list),
            'edgeCount': len(self.get_all_edges())
        }
    
    @staticmethod
    def build_similarity_graph(data, similarity_field, threshold=0.1):
        """
        Build a graph based on similarity of values in a field
        Useful for finding records with similar values
        """
        graph = Graph(directed=False)
        
        # Add all items as nodes
        for i, item in enumerate(data):
            graph.add_node(i, item)
        
        # Add edges between similar items
        for i in range(len(data)):
            for j in range(i + 1, len(data)):
                if similarity_field in data[i] and similarity_field in data[j]:
                    val1 = data[i][similarity_field]
                    val2 = data[j][similarity_field]
                    
                    try:
                        # Calculate similarity (inverse of difference)
                        diff = abs(float(val1) - float(val2))
                        max_val = max(abs(float(val1)), abs(float(val2)))
                        
                        if max_val > 0:
                            similarity = 1 - (diff / max_val)
                            
                            if similarity >= threshold:
                                graph.add_edge(i, j, weight=similarity)
                    except (ValueError, TypeError):
                        pass
        
        return graph
    
    def __len__(self):
        return len(self.adj_list)
    
    def __repr__(self):
        return f"Graph(nodes={len(self.adj_list)}, directed={self.directed})"
