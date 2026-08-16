import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';

const SortAnimator = ({ result }) => {
  const { isAnimating } = useData();
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [displayArray, setDisplayArray] = useState([]);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [compareIndices, setCompareIndices] = useState([]);

  useEffect(() => {
    if (!result || !result.steps) return;

    setCurrentStep(0);
    const firstStep = result.steps[0];
    if (firstStep) {
      setDisplayArray(firstStep.array || []);
    }
  }, [result]);

  useEffect(() => {
    if (!isAnimating || !result?.steps) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= result.steps.length - 1) {
          return prev;
        }
        
        const nextStep = prev + 1;
        const step = result.steps[nextStep];
        
        if (step.array) {
          setDisplayArray(step.array);
        }
        
        if (step.type === 'compare') {
          setCompareIndices(step.indices || []);
          setHighlightIndices([]);
        } else if (step.type === 'swap') {
          setHighlightIndices(step.indices || []);
          setCompareIndices([]);
        } else {
          setHighlightIndices([]);
          setCompareIndices([]);
        }
        
        return nextStep;
      });
    }, animationSpeed);

    return () => clearInterval(timer);
  }, [isAnimating, result, animationSpeed]);

  if (!result || !displayArray.length) {
    return (
      <div className="text-slate-500">
        No sorting data to display
      </div>
    );
  }

  // Get the field being sorted
  const getValueToDisplay = (item) => {
    if (typeof item === 'object' && item !== null) {
      // Find numeric field
      const numericField = Object.keys(item).find(key => {
        const val = item[key];
        return !isNaN(parseFloat(val)) && isFinite(val);
      });
      return numericField ? item[numericField] : Object.values(item)[0];
    }
    return item;
  };

  // Calculate max value for scaling
  const values = displayArray.map(getValueToDisplay).map(v => parseFloat(v) || 0);
  const maxValue = Math.max(...values, 1);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="flex-1 flex items-end justify-center space-x-1">
        {displayArray.map((item, idx) => {
          const value = parseFloat(getValueToDisplay(item)) || 0;
          const height = (value / maxValue) * 300;
          const isComparing = compareIndices.includes(idx);
          const isSwapping = highlightIndices.includes(idx);
          
          let bgColor = 'bg-indigo-500';
          if (isComparing) bgColor = 'bg-yellow-500';
          if (isSwapping) bgColor = 'bg-green-500';
          
          return (
            <div
              key={idx}
              className="flex flex-col items-center"
              style={{ width: `${Math.max(100 / displayArray.length, 2)}%` }}
            >
              <div
                className={`w-full ${bgColor} rounded-t transition-all duration-200`}
                style={{ height: `${Math.max(height, 10)}px` }}
              />
              <div className="text-xs text-slate-400 mt-1 truncate w-full text-center">
                {value.toFixed(0)}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-400">
        Step {currentStep + 1} / {result.steps?.length || 0}
      </div>
    </div>
  );
};

export default SortAnimator;
