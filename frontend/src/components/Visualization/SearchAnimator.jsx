import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';

const SearchAnimator = ({ result }) => {
  const { isAnimating, data } = useData();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!result || !result.steps) return;
    setCurrentStep(0);
  }, [result]);

  useEffect(() => {
    if (!isAnimating || !result?.steps) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= result.steps.length - 1) return prev;
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isAnimating, result]);

  if (!result) {
    return <div className="canvas-empty"><p>No search data</p></div>;
  }

  const currentStepData = result.steps?.[currentStep];

  // Comparison results
  if (result.linear || result.binary || result.hash) {
    const fastest = result.summary?.fastest;
    return (
      <div className="search-results">
        <div className="graph-header">
          <h4 className="graph-title">Search Comparison</h4>
        </div>
        <div className="search-compare-grid">
          {result.linear && (
            <ComparisonCard
              title="Linear Search"
              result={result.linear}
              isWinner={fastest === 'linear'}
            />
          )}
          {result.binary && (
            <ComparisonCard
              title="Binary Search"
              result={result.binary}
              isWinner={fastest === 'binary'}
            />
          )}
          {result.hash && (
            <ComparisonCard
              title="Hash Lookup"
              result={result.hash}
              isWinner={fastest === 'hash'}
            />
          )}
        </div>

        {result.summary && (
          <div className="traversal-section" style={{ marginTop: '1rem' }}>
            <div className="traversal-section-label">Summary</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <p style={{ margin: '0.25rem 0' }}>
                Fastest: <strong style={{ color: 'var(--color-emerald)' }}>{result.summary.fastest}</strong>
              </p>
              <p style={{ margin: '0.25rem 0' }}>
                Fewest comparisons: <strong style={{ color: 'var(--color-violet)' }}>{result.summary.fewest_comparisons}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Single search
  return (
    <div className="search-results">
      <div className="graph-header">
        <h4 className="graph-title">{result.algorithm}</h4>
        <p className="graph-subtitle">
          {result.found ? 'Value found' : 'Value not found'}
        </p>
      </div>

      {currentStepData && (
        <div className="traversal-section">
          <div className="traversal-section-label">Current Step</div>
          <div style={{ fontSize: '0.8125rem', display: 'flex', gap: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>
              Type: <strong style={{ color: 'var(--color-violet)' }}>{currentStepData.type}</strong>
            </span>
            {currentStepData.index !== undefined && (
              <span style={{ color: 'var(--text-tertiary)' }}>
                Index: <strong style={{ color: 'var(--color-amber)' }}>{currentStepData.index}</strong>
              </span>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', margin: '1rem 0' }}>
        {(data || []).slice(0, 20).map((item, idx) => {
          let bg = 'var(--surface-3)';
          let color = 'var(--text-secondary)';

          if (currentStepData) {
            if (currentStepData.index === idx) {
              bg = currentStepData.found ? 'var(--color-emerald)' : 'var(--color-amber)';
              color = '#0c0e14';
            } else if (currentStepData.left !== undefined && currentStepData.right !== undefined) {
              if (idx >= currentStepData.left && idx <= currentStepData.right) {
                bg = 'var(--color-blue-tint)';
                color = 'var(--color-blue)';
              }
              if (idx === currentStepData.mid) {
                bg = 'var(--color-amber)';
                color = '#0c0e14';
              }
            }
          }

          return (
            <div
              key={idx}
              style={{
                background: bg,
                color,
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              {idx}
            </div>
          );
        })}
      </div>

      <div className="sort-footer">
        Step {currentStep + 1} / {result.steps?.length || 0}
      </div>
    </div>
  );
};

const ComparisonCard = ({ title, result, isWinner }) => {
  return (
    <div className={`search-compare-card ${isWinner ? 'winner' : ''}`}>
      <div className="search-compare-card-title">{title}</div>

      <div className="search-compare-stat">
        <span className="search-compare-stat-label">Comparisons</span>
        <span className="search-compare-stat-value">{result.comparisons}</span>
      </div>
      <div className="search-compare-stat">
        <span className="search-compare-stat-label">Time</span>
        <span className="search-compare-stat-value">{result.time?.toFixed(3)} ms</span>
      </div>
      <div className="search-compare-stat">
        <span className="search-compare-stat-label">Complexity</span>
        <span className="search-compare-stat-value">{result.complexity}</span>
      </div>

      <span className={`search-found-badge ${result.found ? 'search-found-yes' : 'search-found-no'}`}>
        {result.found ? '✓ Found' : '✗ Not found'}
      </span>
    </div>
  );
};

export default SearchAnimator;
