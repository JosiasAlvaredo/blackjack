import React, { useState } from 'react';
import './mainpage.css';
import Game from './Game';

const MainPage = () => {
  const [showGame, setShowGame] = useState(false);

  const handleButtonClick = () => {
    setShowGame(prevShowGame => !prevShowGame);
  };

  return (
    <div className="main-page">
      <button onClick={handleButtonClick}>
        {showGame ? 'Hide Game' : 'Show Game'}
      </button>
      {showGame && <Game />}
    </div>
  );
};

export default MainPage;