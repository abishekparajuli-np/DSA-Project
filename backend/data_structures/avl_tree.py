"""
AVL Tree - Self-balancing binary search tree
Provides O(log n) guaranteed for insertion, deletion, and search
"""

class AVLNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def __init__(self):
        self.root = None
        self.size = 0
    
    def _get_height(self, node):
        """Get height of node"""
        if node is None:
            return 0
        return node.height
    
    def _get_balance(self, node):
        """Get balance factor of node"""
        if node is None:
            return 0
        return self._get_height(node.left) - self._get_height(node.right)
    
    def _update_height(self, node):
        """Update height of node"""
        if node is not None:
            node.height = 1 + max(self._get_height(node.left), self._get_height(node.right))
    
    def _rotate_right(self, y):
        """Right rotation"""
        x = y.left
        T2 = x.right
        
        # Perform rotation
        x.right = y
        y.left = T2
        
        # Update heights
        self._update_height(y)
        self._update_height(x)
        
        return x
    
    def _rotate_left(self, x):
        """Left rotation"""
        y = x.right
        T2 = y.left
        
        # Perform rotation
        y.left = x
        x.right = T2
        
        # Update heights
        self._update_height(x)
        self._update_height(y)
        
        return y
    
    def insert(self, key, value):
        """Insert key-value pair - O(log n)"""
        self.root, inserted = self._insert_node(self.root, key, value)
        if inserted:
            self.size += 1
    
    def _insert_node(self, node, key, value):
        """Helper for insert with balancing"""
        # Standard BST insertion
        if node is None:
            return AVLNode(key, value), True
        
        if key < node.key:
            node.left, inserted = self._insert_node(node.left, key, value)
        elif key > node.key:
            node.right, inserted = self._insert_node(node.right, key, value)
        else:
            # Key already exists, update value
            node.value = value
            return node, False
        
        # Update height
        self._update_height(node)
        
        # Get balance factor
        balance = self._get_balance(node)
        
        # Left-Left Case
        if balance > 1 and key < node.left.key:
            return self._rotate_right(node), inserted
        
        # Right-Right Case
        if balance < -1 and key > node.right.key:
            return self._rotate_left(node), inserted
        
        # Left-Right Case
        if balance > 1 and key > node.left.key:
            node.left = self._rotate_left(node.left)
            return self._rotate_right(node), inserted
        
        # Right-Left Case
        if balance < -1 and key < node.right.key:
            node.right = self._rotate_right(node.right)
            return self._rotate_left(node), inserted
        
        return node, inserted
    
    def search(self, key):
        """Search for a key - O(log n)"""
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
    
    def delete(self, key):
        """Delete a key - O(log n)"""
        self.root, deleted = self._delete_node(self.root, key)
        if deleted:
            self.size -= 1
        return deleted
    
    def _delete_node(self, node, key):
        """Helper for delete with balancing"""
        if node is None:
            return None, False
        
        if key < node.key:
            node.left, deleted = self._delete_node(node.left, key)
        elif key > node.key:
            node.right, deleted = self._delete_node(node.right, key)
        else:
            # Node to be deleted found
            # Case 1: No children or one child
            if node.left is None:
                return node.right, True
            elif node.right is None:
                return node.left, True
            
            # Case 2: Two children
            # Find minimum node in right subtree
            min_node = self._find_min(node.right)
            node.key = min_node.key
            node.value = min_node.value
            node.right, _ = self._delete_node(node.right, min_node.key)
            deleted = True
        
        if node is None:
            return None, deleted
        
        # Update height
        self._update_height(node)
        
        # Get balance factor
        balance = self._get_balance(node)
        
        # Left-Left Case
        if balance > 1 and self._get_balance(node.left) >= 0:
            return self._rotate_right(node), deleted
        
        # Left-Right Case
        if balance > 1 and self._get_balance(node.left) < 0:
            node.left = self._rotate_left(node.left)
            return self._rotate_right(node), deleted
        
        # Right-Right Case
        if balance < -1 and self._get_balance(node.right) <= 0:
            return self._rotate_left(node), deleted
        
        # Right-Left Case
        if balance < -1 and self._get_balance(node.right) > 0:
            node.right = self._rotate_right(node.right)
            return self._rotate_left(node), deleted
        
        return node, deleted
    
    def _find_min(self, node):
        """Find minimum node"""
        while node.left is not None:
            node = node.left
        return node
    
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
            'type': 'avl',
            'size': self.size,
            'height': self.height(),
            'root': self._node_to_visualization(self.root, 0),
            'isBalanced': True  # AVL is always balanced
        }
    
    def _node_to_visualization(self, node, level):
        """Convert node to visualization format"""
        if node is None:
            return None
        
        return {
            'key': node.key,
            'value': node.value,
            'level': level,
            'height': node.height,
            'balance': self._get_balance(node),
            'left': self._node_to_visualization(node.left, level + 1),
            'right': self._node_to_visualization(node.right, level + 1)
        }
    
    def __len__(self):
        return self.size
    
    def __repr__(self):
        return f"AVLTree(size={self.size}, height={self.height()})"
