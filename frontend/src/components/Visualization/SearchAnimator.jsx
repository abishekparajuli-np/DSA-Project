import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';

const SearchAnimator = ({ result }) => {
  const { isAnimating, data } = useData();
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed] = useState(100);

  useEffect(() => {
    if (!result || !result.steps) return;
    setCurrentStep(0);
  }, [result]);

  useEffect(() => {
    if (!isAnimating || !result?.steps) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= result.steps.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, animationSpeed);

    return () => clearInterval(timer);
  }, [isAnimating, result, animationSpeed]);

  if (!result) {
    return <div className="text-slate-500">No search data to display</div>;
  }

  const currentStepData = result.steps?.[currentStep];

  // For comparison results (multiple algorithms)
  if (result.linear || result.binary || result.hash) {
    return (
      <div className="w-full p-6 space-y-4">
        <h4 className="text-lg font-semibold text-center mb-4">
          Search Algorithm Comparison
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.linear && (
            <ComparisonCard
              title="Linear Search"
              result={result.linear}
              color="bg-blue-500"
            />
          )}
          {result.binary && (
            <ComparisonCard
              title="Binary Search"
              result={result.binary}
              color="bg-purple-500"
            />
          )}
          {result.hash && (
            <ComparisonCard
              title="Hash Lookup"
              result={result.hash}
              color="bg-green-500"
            />
          )}
        </div>

        {result.summary && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <h5 className="font-semibold mb-2">Summary</h5>
            <p className="text-sm text-slate-300">
              Fastest: <span className="text-yellow-400">{result.summary.fastest}</span>
            </p>
            <p className="text-sm text-slate-300">
              Fewest Comparisons:{' '}
              <span className="text-yellow-400">{result.summary.fewest_comparisons}</span>
            </p>
          </div>
        )}
      </div>
    );
  }

  // For single search visualization
  return (
    <div className="w-full p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="text-lg font-semibold">{result.algorithm}</h4>
          <p className="text-sm text-slate-400">
            {result.found ? '✓ Found' : '✗ Not Found'}
          </p>
        </div>

        {currentStepData && (
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-sm">
              <span className="text-slate-400">Step Type:</span>{' '}
              <span className="text-yellow-400">{currentStepData.type}</span>
            </p>
            {currentStepData.index !== undefined && (
              <p className="text-sm">
                <span className="text-slate-400">Checking Index:</span>{' '}
                <span className="text-yellow-400">{currentStepData.index}</span>
              </p>
            )}
            {currentStepData.value !== undefined && (
              <p className="text-sm">
                <span className="text-slate-400">Value:</span>{' '}
                <span className="text-yellow-400">{currentStepData.value}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 flex-wrap">
          {data.slice(0, 20).map((item, idx) => {
            let bgColor = 'bg-slate-700';
            
            if (currentStepData) {
              if (currentStepData.index === idx) {
                bgColor = currentStepData.found
                  ? 'bg-green-500'
                  : 'bg-yellow-500';
              } else if (currentStepData.left !== undefined &&
                         currentStepData.right !== undefined) {
                if (idx >= currentStepData.left && idx <= currentStepData.right) {
                  bgColor = 'bg-blue-500/30';
                }
                if (idx === currentStepData.mid) {
                  bgColor = 'bg-yellow-500';
                }
              }
            }
            
            return (
              <div
                key={idx}
                className={`${bgColor} px-3 py-2 rounded text-sm transition-all duration-200`}
              >
                {idx}
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm text-slate-400">
          Step {currentStep + 1} / {result.steps?.length || 0}
        </div>
      </div>
    </div>
  );
};

const ComparisonCard = ({ title, result, color }) => {
  return (
    <div className="card">
      <div className={`${color} text-white px-3 py-2 rounded-t-lg -mx-4 -mt-4 mb-4`}>
        <h5 className="font-semibold">{title}</h5>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Result:</span>
          <span className={result.found ? 'text-green-400' : 'text-red-400'}>
            {result.found ? '✓ Found' : '✗ Not Found'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Comparisons:</span>
          <span className="text-yellow-400">{result.comparisons}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Time:</span>
          <span className="text-yellow-400">{result.time?.toFixed(3)} ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Complexity:</span>
          <span className="text-purple-400">{result.complexity}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchAnimator;
