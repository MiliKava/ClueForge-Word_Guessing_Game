import React, { useState } from "react";

export default function HintBox({ hints, onHintReveal, disabled }) {
  const [revealedCount, setRevealedCount] = useState(0);

  // When a new game starts, the hints prop might change. 
  // We should reset revealedCount if hints array changes.
  // Actually, standard way is to use a key on the component or useEffect.
  React.useEffect(() => {
    setRevealedCount(0);
  }, [hints]);

  const handleReveal = () => {
    if (revealedCount < hints.length) {
      setRevealedCount(revealedCount + 1);
      onHintReveal();
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {revealedCount > 0 && (
        <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '12px' }}>
          {hints.slice(0, revealedCount).map((hint, i) => (
            <p key={i} style={{ margin: '4px 0', fontStyle: 'italic' }}>
              💡 Hint {i + 1}: {hint}
            </p>
          ))}
        </div>
      )}
      
      {revealedCount < hints.length && (
        <button 
          className="btn-3d btn-accent" 
          onClick={handleReveal}
          disabled={disabled}
        >
          Reveal Hint (-5 Points)
        </button>
      )}
    </div>
  );
}