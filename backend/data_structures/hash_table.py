"""
Hash Table - Hash map implementation with chaining for collision resolution
Provides O(1) average case insertion, deletion, and lookup
"""

class HashTable:
    def __init__(self, initial_capacity=16):
        self.capacity = initial_capacity
        self.size = 0
        self.buckets = [[] for _ in range(self.capacity)]
        self.load_factor_threshold = 0.75
    
    def _hash(self, key):
        """Hash function - O(k) where k is key length"""
        hash_value = hash(str(key))
        return abs(hash_value) % self.capacity
    
    def set(self, key, value):
        """Insert or update key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        # Check if key already exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Add new key-value pair
        bucket.append((key, value))
        self.size += 1
        
        # Check if rehashing is needed
        if self.size / self.capacity > self.load_factor_threshold:
            self._rehash()
    
    def get(self, key):
        """Get value by key - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        return None
    
    def has(self, key):
        """Check if key exists - O(1) average"""
        return self.get(key) is not None
    
    def delete(self, key):
        """Delete key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                self.size -= 1
                return True
        
        return False
    
    def clear(self):
        """Clear all entries"""
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
    
    def keys(self):
        """Get all keys"""
        return [k for bucket in self.buckets for k, v in bucket]
    
    def values(self):
        """Get all values"""
        return [v for bucket in self.buckets for k, v in bucket]
    
    def items(self):
        """Get all key-value pairs"""
        return [(k, v) for bucket in self.buckets for k, v in bucket]
    
    def _rehash(self):
        """Rehash table (double capacity) - O(n)"""
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
        
        # Rehash all entries
        for bucket in old_buckets:
            for key, value in bucket:
                self.set(key, value)
    
    def from_dict_list(self, data, key_field):
        """Load data from list of dicts"""
        self.clear()
        for item in data:
            if key_field in item:
                self.set(item[key_field], item)
    
    def get_visualization_data(self):
        """Get visualization data"""
        bucket_stats = [
            {
                'index': i,
                'size': len(bucket),
                'entries': [{'key': k, 'value': v} for k, v in bucket]
            }
            for i, bucket in enumerate(self.buckets)
        ]
        
        collisions = sum(1 for bucket in self.buckets if len(bucket) > 1)
        max_chain_length = max((len(bucket) for bucket in self.buckets), default=0)
        
        return {
            'type': 'hashtable',
            'size': self.size,
            'capacity': self.capacity,
            'buckets': bucket_stats,
            'loadFactor': f"{(self.size / self.capacity):.3f}",
            'collisions': collisions,
            'maxChainLength': max_chain_length,
            'averageChainLength': f"{(self.size / self.capacity):.2f}"
        }
    
    def get_hash_index(self, key):
        """Get hash index for a key (for visualization)"""
        return self._hash(key)
    
    def __len__(self):
        return self.size
    
    def __iter__(self):
        for bucket in self.buckets:
            for key, value in bucket:
                yield (key, value)
    
    def __repr__(self):
        return f"HashTable(size={self.size}, capacity={self.capacity})"
