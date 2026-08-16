import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';

const SortAnimator = ({ result }) => {
  const { isAnimating, stopAnimation } = useData();
  const [currentStep, setCurrentStep] = useState(0);
  const [displayArray, setDisplayArray] = useState([]);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [compareIndices, setCompareIndices] = useState([]);

  useEffect(() => {
    if (!result || !result.steps) return;
    setCurrentStep(0);
    setHighlightIndices([]);
    setCompareIndices([]);
    const firstStep = result.steps[0];
    if (firstStep) setDisplayArray(firstStep.array || []);
  }, [result]);

  useEffect(() => {
    if (!isAnimating || !result?.steps) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= result.steps.length - 1) {
          stopAnimation();
          return prev;
        }
        const nextStep = prev + 1;
        const step = result.steps[nextStep];
        if (step.array) setDisplayArray(step.array);

        if (step.type === 'compare') {
          setCompareIndices(step.indices || []);
          setHighlightIndices([]);
        } else if (['swap', 'heapify', 'extract', 'merge'].includes(step.type)) {
          setHighlightIndices(step.indices || []);
          setCompareIndices([]);
        } else if (step.type === 'pivot') {
          setHighlightIndices([step.index]);
          setCompareIndices([]);
        } else {
          setHighlightIndices([]);
          setCompareIndices([]);
        }
        return nextStep;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isAnimating, result, stopAnimation]);

  if (!result || !displayArray.length) {
    return <div className="canvas-empty"><p>No sorting data</p></div>;
  }

  const sortField = result.field;

  const getValueToDisplay = (item) => {
    if (typeof item === 'object' && item !== null) {
      if (sortField && sortField in item) return item[sortField];
      const numericField = Object.keys(item).find((key) => {
        const val = item[key];
        return !isNaN(parseFloat(val)) && isFinite(val);
      });
      return numericField ? item[numericField] : Object.values(item)[0];
    }
    return item;
  };

  const values = displayArray.map(getValueToDisplay).map((v) => parseFloat(v) || 0);
  const maxValue = Math.max(...values, 1);

  return (
    <div className="sort-viz">
      {sortField && (
        <div className="sort-field-label">
          Sorting by <strong>{sortField}</strong>
        </div>
      )}
      <div className="sort-bars">
        {displayArray.map((item, idx) => {
          const value = parseFloat(getValueToDisplay(item)) || 0;
          const height = (value / maxValue) * 300;
          const isComparing = compareIndices.includes(idx);
          const isSwapping = highlightIndices.includes(idx);

          let barClass = 'sort-bar sort-bar-default';
          if (isComparing) barClass = 'sort-bar sort-bar-compare';
          if (isSwapping) barClass = 'sort-bar sort-bar-swap';

          return (
            <div
              key={idx}
              className="sort-bar-col"
              style={{ width: `${Math.max(100 / displayArray.length, 2)}%` }}
            >
              <div className={barClass} style={{ height: `${Math.max(height, 6)}px` }} />
              {displayArray.length <= 30 && (
                <div className="sort-bar-value">{value.toFixed(0)}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sort-footer">
        Step {currentStep + 1} / {result.steps?.length || 0}
        {currentStep >= (result.steps?.length || 0) - 1 && result.steps?.length > 0 && (
          <span className="sort-complete">✓ Complete</span>
        )}
      </div>
    </div>
  );
};

export default SortAnimator;
