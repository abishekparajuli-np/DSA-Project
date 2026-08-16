const ArrayVisualizer = ({ data }) => {
  if (!data || !data.elements) {
    return <div className="canvas-empty"><p>No array data</p></div>;
  }

  return (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <div className="graph-header">
        <h4 className="graph-title">Dynamic Array</h4>
        <p className="graph-subtitle">
          Size {data.size} · Capacity {data.capacity} · Load {data.loadFactor}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
        {data.elements.map((item, idx) => {
          const displayValue = typeof item === 'object'
            ? Object.values(item)[0]
            : item;

          return (
            <div
              key={idx}
              style={{
                background: 'var(--color-violet-tint)',
                border: '1px solid rgba(139, 124, 246, 0.15)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '52px',
              }}
            >
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>[{idx}]</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-violet)' }}>
                {String(displayValue).slice(0, 10)}
              </div>
            </div>
          );
        })}
      </div>

      {data.size < data.capacity && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginTop: '8px' }}>
          {Array.from({ length: Math.min(data.capacity - data.size, 10) }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              style={{
                background: 'transparent',
                border: '1px dashed var(--border)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '52px',
              }}
            >
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>[{data.size + idx}]</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>∅</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArrayVisualizer;
