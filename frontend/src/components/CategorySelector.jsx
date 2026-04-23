import React, { useState } from "react";
import "./CategorySelector.css";

export default function CategorySelector({ onSelect, isStarting }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: "food", label: "Food", icon: "🍔", color: "var(--c-orange)" },
    { id: "bollywood song", label: "B-Wood Song", icon: "🎵", color: "var(--c-pink)" },
    { id: "bollywood dialogue", label: "B-Wood Dialog", icon: "💬", color: "var(--c-yellow)" },
    { id: "bollywood movie", label: "B-Wood Movie", icon: "🎬", color: "var(--c-lightpink)" },
    { id: "country", label: "Country", icon: "🌍", color: "#ab4156" },
    { id: "animal", label: "Animal", icon: "🦁", color: "#d19a15" }
  ];

  const conicGradient = categories.map((cat, i) => {
    const startAngle = i * 60;
    const endAngle = (i + 1) * 60;
    return `${cat.color} ${startAngle}deg ${endAngle}deg`;
  }).join(", ");

  const handleSpin = () => {
    if (spinning || isStarting) return;

    setSpinning(true);
    setSelectedCategory(null);
    const randomIndex = Math.floor(Math.random() * 6);

    const sliceAngle = 60;
    const targetAngle = 360 - (randomIndex * sliceAngle + 30);
    const newRotation = rotation + (360 * 5) + (targetAngle - (rotation % 360));

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setSelectedCategory(categories[randomIndex].id);
    }, 5500);
  };

  const handleStart = () => {
    if (selectedCategory) {
      onSelect(selectedCategory);
    }
  };

  return (
    <div className="glass-panel spin-wheel-container">
      <h1 className="game-title" style={{ color: 'var(--text)', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 4px 10px rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Word Puzzle
      </h1>

      {selectedCategory ? (
        <h2 style={{ color: 'var(--c-yellow)', textTransform: 'uppercase' }}>
          You landed on {categories.find(c => c.id === selectedCategory).label}!
        </h2>
      ) : (
        <h2>Spin the Wheel!</h2>
      )}

      <div className="wheel-wrapper">
        <div className="wheel-pointer">▼</div>
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${conicGradient})`
          }}
        >
          {categories.map((cat, i) => {
            const labelAngle = i * 60 + 30;
            return (
              <div
                key={cat.id}
                className="wheel-label-container"
                style={{
                  transform: `rotate(${labelAngle}deg)`
                }}
              >
                <div className="wheel-label">
                  <span className="wheel-icon">{cat.icon}</span>
                  <span className="wheel-text">{cat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-center">
        {!selectedCategory || spinning ? (
          <button
            className="btn-3d btn-accent spin-btn"
            onClick={handleSpin}
            disabled={spinning || isStarting}
          >
            {spinning ? "Spinning..." : "SPIN!"}
          </button>
        ) : (
          <>
            <button
              className="btn-3d spin-btn"
              onClick={handleSpin}
              disabled={isStarting}
            >
              Spin Again
            </button>
            <button
              className="btn-3d btn-accent spin-btn"
              onClick={handleStart}
              disabled={isStarting}
            >
              {isStarting ? "Generating Puzzle..." : "Start Game!"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}