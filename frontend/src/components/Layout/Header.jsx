import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Data Insights Explorer</h1>
              <p className="text-sm text-indigo-100">
                Live Algorithm Visualization & Data Analysis Engine
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-indigo-200">Powered by</p>
              <p className="text-sm font-semibold">React + Flask</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
