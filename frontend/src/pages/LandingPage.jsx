import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Trophy, Zap, MousePointer2, Star, Gamepad2 } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const LandingPage = () => {
  const bgLetters = ['T', 'H', 'E', 'F', 'U', 'N', 'I', 'S', 'W', 'A', 'I', 'T', 'I', 'N', 'G', 'L', 'E', 'T', 'S', 'P', 'L', 'A', 'Y'];

  return (
    <div className="landing-container" style={{ textAlign: 'left' }}>

      {/* Background Letters Animation */}
      <div className="floating-bg-letters">
        {bgLetters.map((letter, i) => (
          <div
            key={i}
            className="bg-letter"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 🎯 MAIN HEADING */}
            <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '1rem', marginTop: '-5rem' }}>
              Decode Words, <br />
              <span className="text-gradient">Conquer</span> the Challenge.
            </h1>

            {/* 💡 SUBTEXT (FIXED) */}
            <p style={{
              fontSize: '1.3rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              marginBottom: '2.5rem',
              lineHeight: '1.6'
            }}>
              AI-powered word puzzles across multiple categories.
              Test your thinking, unlock hints, and climb the leaderboard.
            </p>

            {/* 🚀 BUTTONS */}
            <div className="hero-btns" style={{ display: 'flex', gap: '1.5rem' }}>
              <Link
                to="/play"
                className="btn-3d btn-accent"
                style={{ padding: '16px 40px', fontSize: '1.2rem', textDecoration: 'none' }}
              >
                Start Playing 🚀
              </Link>

              <a
                href="#features"
                className="btn-3d"
                style={{
                  padding: '16px 40px',
                  fontSize: '1.2rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  textDecoration: 'none'
                }}
              >
                Explore Features
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem -1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '3rem' }}>Why Play <span style={{ color: 'var(--c-yellow)' }}>ClueForge?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Engineered for fun, designed for excellence.</p>
        </div>

        <div className="feature-grid">
          <FeatureCard
            icon={Brain}
            title="Brain Training"
            description="Sharpen your mind with thousands of words across dozens of unique categories."
            delay={0.1}
          />
          <FeatureCard
            icon={Sparkles}
            title="Stunning Visuals"
            description="Experience a premium UI with smooth animations and glassmorphic designs."
            delay={0.2}
          />
          <FeatureCard
            icon={Zap}
            title="Instant Fun"
            description="Just pick a category, spin the wheel, and start playing."
            delay={0.3}
          />
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" style={{ background: 'rgba(0,0,0,0.2)', padding: '5rem 0', width: '100%' }}>
        <div style={{ maxWidth: '2000px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>How to <span style={{ color: 'var(--c-pink)' }}>Win</span></h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { icon: MousePointer2, text: "Choose your favorite word category" },
                  { icon: Star, text: "Spin the wheel for bonus points" },
                  { icon: Trophy, text: "Guess the word and claim your victory" }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}
                  >
                    <div style={{ background: 'var(--c-pink)', padding: '10px', borderRadius: '12px' }}>
                      <item.icon size={24} />
                    </div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
              <div
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  border: '2px dashed rgba(255,255,255,0.2)',
                  width: '380px',
                  marginLeft: '-2rem'
                }}
              >
                <video
                  src="../public/videos/demo.mp4"
                  width="350"
                  height="350"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    borderRadius: '12px',
                    marginLeft: '-0.6rem'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default LandingPage;
