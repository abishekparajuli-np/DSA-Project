"""
Binary Search Tree
Provides O(log n) average case insertion, deletion, and search
O(n) worst case if tree becomes unbalanced
"""

class BSTNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
        self.size = 0
    
    def insert(self, key, value):
        """Insert key-value pair - O(log n) average"""
        if self.root is None:
            self.root = BSTNode(key, value)
            self.size += 1
        else:
            if self._insert_node(self.root, key, value):
                self.size += 1
    
    def _insert_node(self, node, key, value):
        """Helper for insert"""
        if key < node.key:
            if node.left is None:
                node.left = BSTNode(key, value)
                return True
            else:
                return self._insert_node(node.left, key, value)
        elif key > node.key:
            if node.right is None:
                node.right = BSTNode(key, value)
                return True
            else:
                return self._insert_node(node.right, key, value)
        else:
            # Key already exists, update value
            node.value = value
            return False
    
    def search(self, key):
        """Search for a key - O(log n) average"""
        return self._search_node(self.root, key)
    
    def _search_node(self, node, key):
        """Helper for search"""
        if node is None:
            return None
        
        if key < node.key:
            return self._search_node(node.left, key)
        elif key > node.key:
            return self._search_node(node.right, key)
        else:
            return node.value
    
    def has(self, key):
        """Check if key exists"""
        return self.search(key) is not None
    
    def delete(self, key):
        """Delete a key - O(log n) average"""
        self.root, deleted = self._delete_node(self.root, key)
        if deleted:
            self.size -= 1
        return deleted
    
    def _delete_node(self, node, key):
        """Helper for delete"""
        if node is None:
            return None, False
        
        if key < node.key:
            node.left, deleted = self._delete_node(node.left, key)
            return node, deleted
        elif key > node.key:
            node.right, deleted = self._delete_node(node.right, key)
            return node, deleted
        else:
            # Node to be deleted found
            # Case 1: No children
            if node.left is None and node.right is None:
                return None, True
            
            # Case 2: One child
            if node.left is None:
                return node.right, True
            if node.right is None:
                return node.left, True
            
            # Case 3: Two children
            # Find minimum node in right subtree
            min_node = self._find_min(node.right)
            node.key = min_node.key
            node.value = min_node.value
            node.right, _ = self._delete_node(node.right, min_node.key)
            return node, True
    
    def _find_min(self, node):
        """Find minimum node"""
        while node.left is not None:
            node = node.left
        return node
    
    def find_min(self):
        """Find minimum key"""
        if self.root is None:
            return None
        node = self._find_min(self.root)
        return {'key': node.key, 'value': node.value}
    
    def find_max(self):
        """Find maximum key"""
        if self.root is None:
            return None
        node = self.root
        while node.right is not None:
            node = node.right
        return {'key': node.key, 'value': node.value}
    
    def inorder(self):
        """In-order traversal (sorted order)"""
        result = []
        self._inorder_traversal(self.root, result)
        return result
    
    def _inorder_traversal(self, node, result):
        """Helper for inorder"""
        if node is not None:
            self._inorder_traversal(node.left, result)
            result.append({'key': node.key, 'value': node.value})
            self._inorder_traversal(node.right, result)
    
    def preorder(self):
        """Pre-order traversal"""
        result = []
        self._preorder_traversal(self.root, result)
        return result
    
    def _preorder_traversal(self, node, result):
        """Helper for preorder"""
        if node is not None:
            result.append({'key': node.key, 'value': node.value})
            self._preorder_traversal(node.left, result)
            self._preorder_traversal(node.right, result)
    
    def levelorder(self):
        """Level-order traversal (BFS)"""
        if self.root is None:
            return []
        
        result = []
        queue = [self.root]
        
        while queue:
            node = queue.pop(0)
            result.append({'key': node.key, 'value': node.value})
            
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        
        return result
    
    def range_search(self, min_key, max_key):
        """Range query: find all keys between min and max (inclusive)"""
        result = []
        self._range_search_helper(self.root, min_key, max_key, result)
        return result
    
    def _range_search_helper(self, node, min_key, max_key, result):
        """Helper for range search"""
        if node is None:
            return
        
        if node.key > min_key:
            self._range_search_helper(node.left, min_key, max_key, result)
        
        if min_key <= node.key <= max_key:
            result.append({'key': node.key, 'value': node.value})
        
        if node.key < max_key:
            self._range_search_helper(node.right, min_key, max_key, result)
    
    def height(self):
        """Get tree height"""
        return self._get_height(self.root)
    
    def _get_height(self, node):
        """Helper for height"""
        if node is None:
            return 0
        return 1 + max(self._get_height(node.left), self._get_height(node.right))
    
    def clear(self):
        """Clear tree"""
        self.root = None
        self.size = 0
    
    def from_dict_list(self, data, key_field):
        """Load data from list of dicts"""
        self.clear()
        for item in data:
            if key_field in item:
                self.insert(item[key_field], item)
    
    def get_visualization_data(self):
        """Get visualization data"""
        return {
            'type': 'bst',
            'size': self.size,
            'height': self.height(),
            'root': self._node_to_visualization(self.root, 0),
            'isBalanced': self._is_balanced(self.root)
        }
    
    def _node_to_visualization(self, node, level):
        """Convert node to visualization format"""
        if node is None:
            return None
        
        return {
            'key': node.key,
            'value': node.value,
            'level': level,
            'left': self._node_to_visualization(node.left, level + 1),
            'right': self._node_to_visualization(node.right, level + 1)
        }
    
    def _is_balanced(self, node):
        """Check if tree is balanced"""
        if node is None:
            return True
        
        left_height = self._get_height(node.left)
        right_height = self._get_height(node.right)
        
        if abs(left_height - right_height) > 1:
            return False
        
        return self._is_balanced(node.left) and self._is_balanced(node.right)
    
    def __len__(self):
        return self.size
    
    def __repr__(self):
        return f"BinarySearchTree(size={self.size}, height={self.height()})"
