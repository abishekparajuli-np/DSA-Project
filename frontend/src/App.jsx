import { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
