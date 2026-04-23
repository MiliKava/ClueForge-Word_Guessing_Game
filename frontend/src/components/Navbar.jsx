import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Trophy, Home, Play, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="nav-glass">
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsOpen(false)}>
          <Gamepad2 size={32} color="var(--c-yellow)" />
          <span className="logo-text">
            CLUE<span style={{ color: 'var(--c-yellow)' }}>FORGE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}>
            <Trophy size={20} />
            <span>Leaderboard</span>
          </Link>
          <Link to="/play" className="btn-3d btn-accent nav-play-btn">
            <Play size={18} fill="currentColor" />
            <span>Play Now</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" className={`mobile-link ${isActive('/') ? 'active' : ''}`} onClick={toggleMenu}>
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link to="/leaderboard" className={`mobile-link ${isActive('/leaderboard') ? 'active' : ''}`} onClick={toggleMenu}>
          <Trophy size={24} />
          <span>Leaderboard</span>
        </Link>
        <Link to="/play" className="btn-3d btn-accent" style={{ marginTop: '1rem', width: '80%' }} onClick={toggleMenu}>
          <Play size={20} fill="currentColor" />
          <span>Play Now</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
