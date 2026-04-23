import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, User, Loader2, Search, TrendingUp, Calendar, Globe, Share2 } from "lucide-react";
import { getLeaderboard } from "../api/gameApi";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-time");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getLeaderboard();
        setScores(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  const filteredScores = useMemo(() => {
    return scores.filter(score => 
      score.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [scores, searchQuery]);

  const topThree = filteredScores.slice(0, 3);
  const rest = filteredScores.slice(3);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '60vh' }}>
        <div className="loader-container">
          <Loader2 className="animate-spin" size={60} color="var(--c-yellow)" />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            style={{ marginTop: '1.5rem', fontWeight: 600 }}
          >
            Decoding Rankings...
          </motion.h2>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="leaderboard-header"
      >
        <h1 className="main-title">
          Global <span className="text-gradient">Champions</span>
        </h1>
        <p className="subtitle">
          The elite decoders of the ClueForge universe.
        </p>
      </motion.div>

      {/* Interactive Controls */}
      <div className="leaderboard-controls">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'all-time' ? 'active' : ''}`}
            onClick={() => setActiveTab('all-time')}
          >
            <Globe size={18} /> All Time
          </button>
          <button 
            className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            <Calendar size={18} /> Weekly
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            <TrendingUp size={18} /> Trending
          </button>
        </div>

        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Find a champion..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Podium for Top 3 */}
      <AnimatePresence mode="wait">
        {searchQuery === "" && topThree.length > 0 && (
          <motion.div 
            key="podium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="podium"
          >
            {/* Rank 2 */}
            {topThree[1] && (
              <motion.div 
                className="podium-item rank-2"
                whileHover={{ y: -10 }}
              >
                <div className="podium-rank"><Medal size={24} /></div>
                <div className="podium-card glass-morph">
                  <div className="avatar-circle">
                    <User size={40} />
                  </div>
                  <div className="row-name">{topThree[1].username}</div>
                  <div className="row-score">{topThree[1].score.toLocaleString()}</div>
                  <div className="rank-label">2nd Place</div>
                </div>
              </motion.div>
            )}

            {/* Rank 1 */}
            {topThree[0] && (
              <motion.div 
                className="podium-item rank-1"
                whileHover={{ y: -15 }}
              >
                <motion.div 
                  className="crown-glow"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="podium-rank"><Crown size={32} /></div>
                <div className="podium-card glass-morph">
                  <div className="avatar-circle gold">
                    <User size={50} />
                  </div>
                  <div className="row-name elite">{topThree[0].username}</div>
                  <div className="row-score big">{topThree[0].score.toLocaleString()}</div>
                  <div className="rank-label">Grand Master</div>
                </div>
              </motion.div>
            )}

            {/* Rank 3 */}
            {topThree[2] && (
              <motion.div 
                className="podium-item rank-3"
                whileHover={{ y: -5 }}
              >
                <div className="podium-rank"><Trophy size={20} /></div>
                <div className="podium-card glass-morph">
                  <div className="avatar-circle">
                    <User size={30} />
                  </div>
                  <div className="row-name">{topThree[2].username}</div>
                  <div className="row-score">{topThree[2].score.toLocaleString()}</div>
                  <div className="rank-label">3rd Place</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* List for the rest */}
      <motion.div 
        className="leaderboard-list-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="list-header">
          <span>Rank</span>
          <span>Player</span>
          <span style={{ textAlign: 'right' }}>Score</span>
        </div>

        <div className="leaderboard-list">
          <AnimatePresence>
            {filteredScores.length > (searchQuery === "" ? 3 : 0) ? (
              (searchQuery === "" ? rest : filteredScores).map((entry, index) => (
                <motion.div 
                  key={entry.username}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="leaderboard-row premium-row"
                >
                  <div className="row-rank-cell">
                    <span className="rank-num">#{searchQuery === "" ? index + 4 : index + 1}</span>
                  </div>
                  <div className="row-user-cell">
                    <div className="user-info">
                      <div className="mini-avatar">
                        <User size={14} />
                      </div>
                      <span className="user-name">{entry.username}</span>
                    </div>
                  </div>
                  <div className="row-score-cell">
                    <span className="score-val">{entry.score.toLocaleString()}</span>
                    <button className="share-btn" title="Share achievement">
                      <Share2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
                key="empty"
              >
                <p>No champions found matching "{searchQuery}"</p>
                <button className="btn-3d btn-accent" onClick={() => setSearchQuery("")}>
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
