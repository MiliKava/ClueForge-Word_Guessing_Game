import React, { useState, useEffect } from "react";
import { startGame, guessLetter, guessFullPhrase, submitScore } from "../api/gameApi";
import CategorySelector from "../components/CategorySelector";
import PuzzleBoard from "../components/PuzzleBoard";
import Keyboard from "../components/Keyboard";
import HintBox from "../components/HintBox";
import FullGuessModal from "../components/FullGuessModal";

export default function Game() {
  const [gameId, setGameId] = useState(null);
  const [masked, setMasked] = useState("");
  const [hints, setHints] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(6);
  const [completed, setCompleted] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [message, setMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation states
  const [showMascot, setShowMascot] = useState(false);
  const [floatingLetters, setFloatingLetters] = useState([]);

  const [isStarting, setIsStarting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("wordie_name") || "");

  const [currentCategory, setCurrentCategory] = useState("");

  const handleStart = async (category) => {
    setIsStarting(true);
    setCurrentCategory(category);
    try {
      const data = await startGame(category);
      if (data.error) {
        alert("Error starting game: " + data.error);
        setIsStarting(false);
        return;
      }
      setGameId(data.game_id);
      setMasked(data.masked);
      setHints(data.hints);
      setScore(data.score);
      setAttempts(data.attempts_left);
      setGuessed([]);
      setCompleted(data.completed);
      setPhrase("");
      setMessage("");
    } catch (e) {
      alert("Network error starting game");
    }
    setIsStarting(false);
  };

  const handleGuess = async (letter) => {
    if (completed) return;
    const data = await guessLetter(gameId, letter);

    const isCorrect = data.correct;

    setMasked(data.masked);
    setScore(data.score);
    setAttempts(data.attempts_left);
    setGuessed([...guessed, letter]);
    setCompleted(data.completed);
    if (data.phrase) setPhrase(data.phrase);

    if (isCorrect) {
      const newLetter = { id: Date.now(), char: letter };
      setFloatingLetters((prev) => [...prev, newLetter]);

      setTimeout(() => {
        setFloatingLetters((prev) => prev.filter(l => l.id !== newLetter.id));
      }, 1000);
    }

    if (data.completed) {
      if (!data.masked.includes("_")) {
        setMessage("You Won! 🎉");
      } else {
        setMessage("Game Over ❌");
        if (data.phrase) setMasked(data.phrase);
      }
    }
  };

  const handleHintReveal = () => {
    setScore((prev) => prev - 5);
  };

  const handleFullGuess = async (guessText) => {
    if (isSubmittingGuess || completed) return;

    setIsSubmittingGuess(true);

    try {
      const data = await guessFullPhrase(gameId, guessText);

      setScore(data.score);
      setAttempts(data.attempts_left);
      setCompleted(data.completed);

      if (data.phrase) setPhrase(data.phrase);

      if (data.completed) {
        if (data.message?.includes("Correct")) {
          setMessage("You Won! 🎉");
          setMasked(data.phrase);
        } else {
          setMessage("Game Over ❌");
          if (data.phrase) setMasked(data.phrase);
        }
      } else {
        alert("Wrong guess!");
      }
    } catch (e) {
      alert("Error submitting guess");
    }

    setIsSubmittingGuess(false);
  };
  const handleGiveUp = async () => {
    if (completed) return;

    try {
      const data = await guessFullPhrase(gameId, "GIVE_UP");

      setScore(data.score);
      setAttempts(data.attempts_left);
      setCompleted(true);
      setPhrase(data.phrase);
      setMasked(data.phrase);

      setMessage("You Gave Up ❌");
    } catch (e) {
      alert("Error giving up");
    }
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {!gameId ? (
        <CategorySelector onSelect={handleStart} isStarting={isStarting} />
      ) : (
        <div className="glass-panel" style={{ marginTop: '2vh' }}>

          <img src="/images/mascot.png" alt="Mascot" className={`mascot-container ${showMascot ? 'show' : ''}`} />

          {floatingLetters.map(fl => (
            <div key={fl.id} className="floating-letter" style={{ left: `${40 + Math.random() * 20}%`, top: '40%' }}>
              {fl.char}
            </div>
          ))}

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 className="game-title" style={{ color: 'var(--text)', fontSize: '2.5rem', margin: '0', textShadow: '0 4px 10px rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Puzzle
            </h2>
            <p style={{ color: 'var(--c-yellow)', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold', margin: '5px 0' }}>
              Category: {currentCategory}
            </p>
          </div>

          <div className="stats-bar">
            <h3>⭐ Score: {score}</h3>
            <h3>❤️ Attempts: {attempts}</h3>
          </div>

          {message && (
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '2.5rem',
              borderRadius: '24px',
              marginBottom: '2rem',
              animation: 'slideUp 0.4s ease',
              border: '4px solid var(--c-yellow)',
              color: 'var(--c-orange)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{message}</h2>
              {phrase && <h3 style={{ fontSize: '1.5rem', color: 'var(--c-pink)', marginBottom: '1.5rem' }}>The answer was: {phrase}</h3>}

              {message.includes("Won") && !submitted && (
                <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>Submit score to Leaderboard?</h4>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        border: '2px solid var(--c-yellow)',
                        fontSize: '1.1rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      className="btn-3d btn-accent"
                      disabled={isSubmitting || !userName}
                      onClick={async () => {
                        setIsSubmitting(true);
                        try {
                          await submitScore(userName, score);
                          localStorage.setItem("wordie_name", userName);
                          setSubmitted(true);
                        } catch (e) {
                          alert("Failed to submit score");
                        }
                        setIsSubmitting(false);
                      }}
                    >
                      {isSubmitting ? "..." : "Submit"}
                    </button>
                  </div>
                </div>
              )}

              {submitted && <p style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '1rem' }}>✅ Score submitted!</p>}

              <button className="btn-3d btn-accent" style={{ marginTop: '1rem' }} onClick={() => {
                setGameId(null);
                setSubmitted(false);
              }}>
                Play Again
              </button>
            </div>
          )}

          <PuzzleBoard masked={masked} />

          <HintBox
            hints={hints}
            onHintReveal={handleHintReveal}
            disabled={completed}
          />

          {!completed && (
            <div className="flex-center" style={{ margin: '2rem 0' }}>
              <button className="btn-3d" onClick={() => setIsModalOpen(true)}>
                ⌨️ Guess Full Answer
              </button>
              <button className="btn-3d" style={{ background: '#ff5252', color: 'white' }} onClick={handleGiveUp}>
                🏳️ Give Up
              </button>
            </div>
          )}

          <Keyboard onGuess={handleGuess} guessed={guessed} disabled={completed} />

          {isModalOpen && (
            <FullGuessModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleFullGuess}
            />
          )}
        </div>
      )}
    </div>
  );
}