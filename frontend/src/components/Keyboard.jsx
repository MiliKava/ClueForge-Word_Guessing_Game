import React, { useEffect } from "react";

export default function Keyboard({ onGuess, guessed, disabled }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const numbers = "0123456789".split("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      const key = e.key.toUpperCase();
      if ((letters.includes(key) || numbers.includes(key)) && !guessed.includes(key)) {
        onGuess(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guessed, onGuess, disabled]);

  const renderKey = (l) => (
    <button
      key={l}
      className="btn-3d"
      style={{
        width: 'min(45px, 10vw)',
        padding: '10px 0',
        fontSize: '1rem',
        margin: '4px'
      }}
      disabled={guessed.includes(l) || disabled}
      onClick={() => onGuess(l)}
    >
      {l}
    </button>
  );

  return (
    <div className="keyboard-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex-center" style={{ marginBottom: '10px' }}>
        {numbers.map(renderKey)}
      </div>
      <div className="flex-center">
        {letters.map(renderKey)}
      </div>
    </div>
  );
}