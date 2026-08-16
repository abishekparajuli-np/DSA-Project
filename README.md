# 🔍 Data Insights Explorer

A comprehensive **Mini Data Analysis Engine** with **Live Algorithm Visualization** built using **React** (frontend) and **Flask** (backend). This project combines data structures, algorithms, and real-time visualizations to explore and analyze datasets interactively.

## 🎯 Project Overview

**Data Insights Explorer** allows users to:
- Load datasets from CSV files or use sample data (students, sales, sensors)
- Visualize data structures in real-time (Arrays, Hash Tables, BST, AVL Trees, Graphs)
- Watch sorting algorithms animate step-by-step (Bubble, Merge, Quick, Heap Sort)
- Compare search algorithms with performance metrics (Linear, Binary, Hash Search)
- Analyze relationships using graph structures with BFS/DFS traversal
- Compute comprehensive statistics (mean, median, mode, std dev, distributions)
- Execute queries for data exploration (top-N, range queries, filtering)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [Data Structures](#-data-structures)
- [Algorithms](#-algorithms)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Technologies Used](#️-technologies-used)

## ✨ Features

### 1. **Data Storage Layer** (3 Core Structures)

#### Dynamic Array
- Resizable array with O(1) amortized insertion
- Automatic capacity doubling when full
- Visual representation of size vs capacity

#### Hash Table
- Collision resolution using chaining
- O(1) average-case lookup, insertion, deletion
- Load factor monitoring and automatic rehashing
- Visualization shows bucket distribution and collisions

#### Binary Search Tree (BST) & AVL Tree
- BST: O(log n) average operations, can become unbalanced
- AVL: Self-balancing with guaranteed O(log n) operations
- Tree height, balance factor, and structure visualization
- Range queries for finding values between min and max

### 2. **Sorting Algorithms** (with Animation)

All sorting algorithms track:
- Number of comparisons
- Number of swaps
- Time complexity
- Step-by-step visualization with color-coded bars

#### Bubble Sort - O(n²)
- Repeatedly swaps adjacent elements
- Comparison-based, stable sort
- Visual: Yellow bars for comparison, green for swaps

#### Merge Sort - O(n log n)
- Divide-and-conquer strategy
- Shows recursive divisions and merging
- Guaranteed O(n log n) performance

#### Quick Sort - O(n log n) average
- Partition-based sorting with pivot selection
- Visual: Highlights pivot and partition boundaries
- In-place sorting algorithm

#### Heap Sort - O(n log n)
- Builds max-heap then extracts elements
- Visual: Shows heap construction and extraction
- In-place, not stable

### 3. **Searching Algorithms** (with Comparison)

#### Linear Search - O(n)
- Sequential scan through array
- Works on unsorted data
- Visual: Highlights current checking position

#### Binary Search - O(log n)
- Requires sorted array
- Divides search space in half each iteration
- Visual: Shows left, right, and mid pointers

#### Hash Lookup - O(1) average
- Direct access using hash function
- Shows hash calculation and bucket access
- Visual: Highlights target bucket

**Compare Mode**: Run all three simultaneously and see:
- Which is fastest
- Which uses fewest comparisons
- Performance metrics side-by-side

### 4. **Graph Structures** (Relationship Analysis)

#### Similarity Graph Construction
- Automatically builds graph based on field similarity
- Threshold-based edge creation (configurable)
- Undirected graph with weighted edges

#### Graph Traversal Algorithms

**Breadth-First Search (BFS)**
- Level-by-level exploration
- Uses queue data structure
- Finds shortest path in unweighted graphs

**Depth-First Search (DFS)**
- Explores as far as possible before backtracking
- Uses stack (recursion) data structure
- Useful for cycle detection and topological sorting

Visualization shows:
- Node visitation order
- Current queue/stack state
- Connected components

### 5. **Statistical Analysis**

Comprehensive statistics computed for any numeric field:

- **Central Tendency**: Mean, Median, Mode
- **Dispersion**: Standard Deviation, Variance, Range
- **Distribution**: Min, Max, Quartiles (Q1, Q2, Q3), IQR
- **Frequency Distribution**: Histogram with configurable bins
- **Interactive Charts**: Bar charts using Recharts library

### 6. **Query Engine**

Natural language-style queries:

```
top 5                    # Get top 5 records by default field
top 10 by marks          # Get top 10 by specific field
bottom 3 by price        # Get bottom 3 records
range 60-80 by marks     # Get records where marks between 60-80
filter status == active  # Filter by exact match
group by department      # Group records by field value
```

## 🏗️ Architecture

### Backend (Flask + Python)

```
backend/
├── app.py                      # Flask application & API routes
├── data_structures/
│   ├── dynamic_array.py        # Resizable array implementation
│   ├── hash_table.py           # Hash map with chaining
│   ├── bst.py                  # Binary Search Tree
│   ├── avl_tree.py             # Self-balancing AVL Tree
│   └── graph.py                # Graph with adjacency list
├── algorithms/
│   ├── sorting.py              # All sorting algorithms with step tracking
│   └── searching.py            # All searching algorithms with step tracking
├── utils/
│   ├── statistics.py           # Statistical analysis functions
│   ├── query_engine.py         # Query parsing and execution
│   └── sample_data.py          # Sample dataset generator
└── requirements.txt
```

### Frontend (React + Vite)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx          # App header
│   │   │   ├── Sidebar.jsx         # Control panel
│   │   │   └── MainContent.jsx     # Main visualization area
│   │   ├── Visualization/
│   │   │   ├── VisualizationCanvas.jsx
│   │   │   ├── SortAnimator.jsx    # Sorting animation
│   │   │   ├── SearchAnimator.jsx  # Search animation
│   │   │   ├── GraphVisualizer.jsx
│   │   │   ├── TreeVisualizer.jsx
│   │   │   ├── ArrayVisualizer.jsx
│   │   │   └── DataTable.jsx
│   │   └── Statistics/
│   │       ├── MetricsDashboard.jsx
│   │       └── StatisticsPanel.jsx
│   ├── context/
│   │   └── DataContext.jsx     # Global state management
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## 🚀 Installation

### Prerequisites

- **Python 3.8+** (Python 3.14 used in development)
- **Node.js 16+** and **npm**
- **Git**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd DSA_Project
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Generate sample data
python -c "from utils.sample_data import SampleDataGenerator; SampleDataGenerator.generate_all_samples('../data')"
```

### Step 3: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## 🎮 Usage

### Start the Backend Server

```bash
cd backend
# Make sure virtual environment is activated
python app.py
```

Backend will run on: `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Open in Browser

Navigate to `http://localhost:5173` and start exploring!

## 📊 Using the Application

### 1. Load Data

**Option A: Upload CSV**
- Click "Load CSV File" button
- Select your CSV file
- Data will be parsed and displayed

**Option B: Load Sample Dataset**
- Select from dropdown: Students, Sales, or Sensors
- Click "Load Sample Dataset"

### 2. Visualize Data Structures

- Select structure type (Array, Hash Table, BST, AVL)
- Choose key field from your data
- Click "Visualize Structure"
- View the structure representation

### 3. Sort and Animate

- Select sorting algorithm
- Choose field to sort by
- Click "Start Sort Animation"
- Watch the bars animate with comparisons and swaps
- View metrics: comparisons, swaps, time, complexity

### 4. Search and Compare

- Select search algorithm
- Enter search value
- Choose field to search in
- Click "Search & Animate" for single algorithm
- Click "Compare All Searches" to compare Linear, Binary, and Hash

### 5. Build Relationship Graph

- Select a numeric field for similarity comparison
- Click "Build Relationship Graph"
- View nodes and edges
- Select BFS or DFS
- Click "Animate Traversal"

### 6. Compute Statistics

- Select field to analyze
- Click "Compute Statistics"
- View comprehensive stats and histogram

### 7. Execute Queries

- Type query (e.g., "top 5 by marks")
- Select field
- Click "Execute Query"
- View filtered results

## 📚 Data Structures

### Dynamic Array

**Time Complexities:**
- Access: O(1)
- Insert (end): O(1) amortized
- Insert (middle): O(n)
- Delete: O(n)
- Search: O(n)

**Features:**
- Automatic resizing (doubles capacity)
- Efficient for sequential access
- Shows load factor (size/capacity)

### Hash Table

**Time Complexities:**
- Insert: O(1) average
- Search: O(1) average
- Delete: O(1) average

**Features:**
- Chaining for collision resolution
- Automatic rehashing at 75% load
- Shows bucket distribution
- Collision count tracking

### Binary Search Tree

**Time Complexities:**
- Insert: O(log n) average, O(n) worst
- Search: O(log n) average, O(n) worst
- Delete: O(log n) average, O(n) worst

**Features:**
- In-order traversal gives sorted order
- Range queries
- Can become unbalanced

### AVL Tree

**Time Complexities:**
- Insert: O(log n) guaranteed
- Search: O(log n) guaranteed
- Delete: O(log n) guaranteed

**Features:**
- Self-balancing
- Height-balanced property (|left_height - right_height| ≤ 1)
- Rotations: Left, Right, Left-Right, Right-Left
- Always balanced

### Graph (Adjacency List)

**Time Complexities:**
- Add Vertex: O(1)
- Add Edge: O(1)
- BFS/DFS: O(V + E)

**Features:**
- Supports directed/undirected
- Weighted edges
- Similarity-based graph construction
- Connected components analysis

## 🧮 Algorithms

### Sorting Algorithms Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

### Searching Algorithms Comparison

| Algorithm | Best | Average | Worst | Requires |
|-----------|------|---------|-------|----------|
| Linear | O(1) | O(n) | O(n) | Nothing |
| Binary | O(1) | O(log n) | O(log n) | Sorted Array |
| Hash | O(1) | O(1) | O(n) | Hash Table |

## 🔌 API Endpoints

### Data Operations

```
POST   /api/upload          - Upload CSV file
GET    /api/sample/:type    - Load sample dataset (students|sales|sensors)
GET    /api/data            - Get current dataset
```

### Data Structures

```
POST   /api/structure/:type - Build structure (array|hash|bst|avl)
```

### Algorithms

```
POST   /api/sort            - Sort data with algorithm
POST   /api/search          - Search with algorithm
POST   /api/search/compare  - Compare all search algorithms
```

### Graph Operations

```
POST   /api/graph/build     - Build similarity graph
POST   /api/graph/traverse  - Traverse graph (BFS/DFS)
```

### Analysis

```
POST   /api/statistics      - Compute statistics
POST   /api/query           - Execute query
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts** - Charting library
- **Lucide React** - Icon library

### Backend
- **Flask 3.0** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing

### Development
- **Python 3.14** - Backend language
- **JavaScript (ES6+)** - Frontend language

## 📸 Sample Datasets

### Students Dataset
- Fields: `student_id`, `name`, `department`, `marks`, `age`, `gpa`
- 50 records
- Use cases: Sorting by marks/GPA, grouping by department

### Sales Dataset
- Fields: `sale_id`, `product`, `category`, `region`, `quantity`, `price`, `revenue`, `month`
- 50 records
- Use cases: Analyzing revenue, regional comparisons

### Sensors Dataset
- Fields: `sensor_id`, `type`, `location`, `reading`, `unit`, `timestamp`, `status`
- 50 records
- Use cases: Temperature analysis, anomaly detection

## 🎓 Educational Value

This project demonstrates:

1. **Data Structure Design**: Implementing core CS data structures from scratch
2. **Algorithm Analysis**: Understanding time/space complexity practically
3. **Visualization Techniques**: Making abstract concepts concrete
4. **Full-Stack Development**: Building complete web applications
5. **API Design**: RESTful architecture and client-server communication
6. **State Management**: React Context for global state
7. **Real-time Updates**: Live animation and step tracking

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional sorting algorithms (Radix, Counting)
- More data structures (Red-Black Trees, B-Trees)
- Enhanced visualizations (D3.js integration)
- Machine learning integration
- Export functionality (PDF reports, CSV)

## 📄 License

This project is created for educational purposes as part of a Data Structures and Algorithms course.

## 👨‍💻 Author

Built with ❤️ as a comprehensive DSA visualization project

## 🙏 Acknowledgments

- Course instructors and TAs
- Open-source community for tools and libraries
- Visualization inspiration from algorithm education platforms

---

**Happy Exploring! 🚀**
# DSA-Project
