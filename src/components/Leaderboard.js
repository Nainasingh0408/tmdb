import React from 'react';
import '../componentscss/Leaderboard.css';

const LeaderboardEntry = ({ avatar, name, allTimeEdits, editsThisWeek }) => (
  <div className="leaderboard-entry">
    <div className="avatar">
      { (
        <div className="avatar-text">{avatar}</div>
      )}
    </div>
    
    <div className="entry-content">
      <div className="username">{name}</div>

      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-bar all-time">
            <div 
              className="progress-fill all-time" 
              style={{ width: `${Math.min((allTimeEdits / 4000000) * 100, 100)}%` }}
            />
            <span className="progress-text">{allTimeEdits.toLocaleString()}</span>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar this-week">
            <div 
              className="progress-fill this-week"
              style={{ width: `${Math.min((editsThisWeek / 35000) * 100, 100)}%` }}
            />
            <span className="progress-text">{editsThisWeek.toLocaleString()}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
);

const Leaderboard = () => {
  const leftColumnData = [
    { name: 'Samara', avatar: '🍎', allTimeEdits: 3400000, editsThisWeek: 30780 },
    { name: 'Shei', avatar: '👤', allTimeEdits: 1356579, editsThisWeek: 13599 },
    { name: 'CeRu', avatar: '🎨', allTimeEdits: 123521, editsThisWeek: 11159 },
    { name: 'raze464', avatar: '🎯', allTimeEdits: 931582, editsThisWeek: 6544 },
    { name: 'Magicus', avatar: 'M', allTimeEdits: 340043, editsThisWeek: 5399 }
  ];

  const rightColumnData = [
    { name: 'maxtherabbit', avatar: 'M', allTimeEdits: 61905, editsThisWeek: 13636 },
    { name: 'whistler2023', avatar: '📺', allTimeEdits: 551047, editsThisWeek: 13434 },
    { name: 'dietong', avatar: '🎭', allTimeEdits: 820996, editsThisWeek: 7897 },
    { name: 't0by', avatar: '🦊', allTimeEdits: 184265, editsThisWeek: 5874 },
    { name: 'SoMeDay', avatar: '🎩', allTimeEdits: 1378091, editsThisWeek: 4339 }
  ];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <div className="leaderboard-legend">
          <p className="legend-item">
            <div className="legend-dot all-time"></div>
            <div className="legend-text">All Time Edits</div>
          </p>
          <p className="legend-item">
            <div className="legend-dot this-week"></div>
            <div className="legend-text">Edits This Week</div>
          </p>
        </div>
      
      </div>
      
      <div className="leaderboard-grid">
        <div className="leaderboard-column">
          {leftColumnData.map((entry, index) => (
            <LeaderboardEntry key={`left-${index}`} {...entry} />
          ))}
        </div>
        <div className="leaderboard-column">
          {rightColumnData.map((entry, index) => (
            <LeaderboardEntry key={`right-${index}`} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
