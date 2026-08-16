# 🚀 Quick Start Guide - Data Insights Explorer

## Installation (First Time Only)

### 1. Backend Setup (2 minutes)
```bash
cd backend
python3 -m venv venv
venv/bin/pip install -r requirements.txt
cd ..
```

### 2. Frontend Setup (2 minutes)
```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Option A: Using Start Script (Recommended)
```bash
./start.sh
```

### Option B: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
venv/bin/python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Access the Application

Open your browser and go to: **http://localhost:5173**

## Quick Tutorial (5 minutes)

### Step 1: Load Data (30 seconds)
1. Click "Load Sample Dataset" dropdown
2. Select "Student Records"
3. Click the blue "Load Sample Dataset" button
4. ✅ You'll see 50 records loaded

### Step 2: Try Sorting (1 minute)
1. Find "Sorting Algorithms" section
2. Select "Bubble Sort" from dropdown
3. Select "marks" as sort field
4. Click "▶️ Start Sort Animation"
5. 🎬 Watch the bars animate! Yellow = comparing, Green = swapping
6. See metrics: comparisons, swaps, time taken

### Step 3: Compare Searches (1 minute)
1. Find "Search Algorithms" section
2. Enter a value to search (e.g., "85")
3. Select field "marks"
4. Click "⚖️ Compare All Searches"
5. 📊 See Linear vs Binary vs Hash comparison with metrics

### Step 4: View Data Structure (1 minute)
1. Find "Data Structure" section
2. Select "AVL Tree"
3. Select "marks" as key field
4. Click "👁️ Visualize Structure"
5. 🌳 See the tree structure with balance factors

### Step 5: Compute Statistics (1 minute)
1. Find "Data Analysis" section
2. Select "marks" field
3. Click "📐 Compute Statistics"
4. 📈 View mean, median, mode, distribution histogram

### Step 6: Build Graph (1 minute)
1. Find "Graph Analysis" section
2. Select "marks" for similarity
3. Click "🕸️ Build Relationship Graph"
4. Click "▶️ Animate Traversal"
5. 🔗 See nodes with similar marks connected

## Sample Datasets Available

### 📚 Students (50 records)
- Fields: student_id, name, department, marks, age, gpa
- Best for: Sorting by marks/GPA, grouping by department

### 💰 Sales (50 records)
- Fields: sale_id, product, category, region, quantity, price, revenue
- Best for: Revenue analysis, regional comparisons

### 📡 Sensors (50 records)
- Fields: sensor_id, type, location, reading, timestamp, status
- Best for: Temperature analysis, reading distributions

## Query Examples

Try these in the "Query Interface":

```
top 5                    # Top 5 records
top 10 by marks          # Top 10 by marks
bottom 3 by price        # Bottom 3 by price
range 60-80             # Records with values 60-80
```

## Troubleshooting

### Backend not starting?
```bash
cd backend
venv/bin/pip install -r requirements.txt
```

### Frontend not starting?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port already in use?
- Backend (5000): Kill process using `pkill -f flask`
- Frontend (5173): Kill process using `pkill -f vite`

## What to Explore

✅ **Data Structures**: Array, Hash Table, BST, AVL Tree visualizations
✅ **Sorting**: Bubble, Merge, Quick, Heap with animations
✅ **Searching**: Linear, Binary, Hash with comparisons
✅ **Graphs**: BFS/DFS traversal on similarity graphs
✅ **Statistics**: Mean, median, mode, distributions
✅ **Queries**: Top-N, ranges, filters

## Next Steps

1. Upload your own CSV file
2. Try different sorting algorithms on same data
3. Compare search performance
4. Build graphs with different fields
5. Execute custom queries

## Need Help?

Check the main **README.md** for:
- Full feature documentation
- Architecture details
- API endpoints
- Algorithm complexity tables
- Educational content

---

**Enjoy exploring data structures and algorithms! 🎓✨**
