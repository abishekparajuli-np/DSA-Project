"""
Dynamic Array - Resizable array implementation
Provides O(1) amortized insertion and O(1) access
"""

class DynamicArray:
    def __init__(self, initial_capacity=10):
        self.capacity = initial_capacity
        self.size = 0
        self.array = [None] * self.capacity
    
    def push(self, element):
        """Add element to end of array - O(1) amortized"""
        if self.size == self.capacity:
            self._resize()
        self.array[self.size] = element
        self.size += 1
    
    def pop(self):
        """Remove and return last element - O(1)"""
        if self.size == 0:
            raise IndexError("Array is empty")
        element = self.array[self.size - 1]
        self.array[self.size - 1] = None
        self.size -= 1
        return element
    
    def get(self, index):
        """Get element at index - O(1)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        return self.array[index]
    
    def set(self, index, element):
        """Set element at index - O(1)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        self.array[index] = element
    
    def insert(self, index, element):
        """Insert element at specific index - O(n)"""
        if index < 0 or index > self.size:
            raise IndexError("Index out of bounds")
        if self.size == self.capacity:
            self._resize()
        # Shift elements to the right
        for i in range(self.size, index, -1):
            self.array[i] = self.array[i - 1]
        self.array[index] = element
        self.size += 1
    
    def remove(self, index):
        """Remove element at specific index - O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        element = self.array[index]
        # Shift elements to the left
        for i in range(index, self.size - 1):
            self.array[i] = self.array[i + 1]
        self.array[self.size - 1] = None
        self.size -= 1
        return element
    
    def index_of(self, element):
        """Find index of element - O(n)"""
        for i in range(self.size):
            if self.array[i] == element:
                return i
        return -1
    
    def contains(self, element):
        """Check if array contains element - O(n)"""
        return self.index_of(element) != -1
    
    def clear(self):
        """Clear all elements"""
        self.array = [None] * self.capacity
        self.size = 0
    
    def to_list(self):
        """Get all elements as regular list"""
        return [self.array[i] for i in range(self.size)]
    
    def from_list(self, lst):
        """Load data from regular list"""
        self.clear()
        self.capacity = max(len(lst) * 2, 10)
        self.array = [None] * self.capacity
        for i, item in enumerate(lst):
            self.array[i] = item
        self.size = len(lst)
    
    def _resize(self):
        """Resize internal array (double capacity) - O(n)"""
        self.capacity *= 2
        new_array = [None] * self.capacity
        for i in range(self.size):
            new_array[i] = self.array[i]
        self.array = new_array
    
    def get_visualization_data(self):
        """Get visualization data"""
        return {
            'type': 'array',
            'size': self.size,
            'capacity': self.capacity,
            'elements': self.to_list(),
            'loadFactor': f"{(self.size / self.capacity * 100):.1f}%"
        }
    
    def __len__(self):
        return self.size
    
    def __iter__(self):
        for i in range(self.size):
            yield self.array[i]
    
    def __repr__(self):
        return f"DynamicArray({self.to_list()})"
