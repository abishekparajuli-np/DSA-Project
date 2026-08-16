import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-header-left">
          <div className="app-header-logo">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="app-header-title">Data Insights Explorer</h1>
            <p className="app-header-subtitle">Algorithm Visualization & Analysis</p>
          </div>
        </div>
        <div className="app-header-right">
          <span className="app-header-tag">React + Flask</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
