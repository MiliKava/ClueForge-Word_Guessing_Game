import React, { useState } from "react";

export default function FullGuessModal({ onClose, onSubmit }) {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.trim()) {
      onSubmit(guess.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Guess the Full Phrase</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            className="modal-input"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your answer..."
          />
          <div className="flex-center" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn-3d" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-3d btn-accent">
              Submit Guess
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
