import React, { useState } from 'react';
import Game from './Game';
import './MainPage.css';

const MainPage = () => {
  const [showGame, setShowGame] = useState(false);

  const handleButtonClick = () => {
    setShowGame(true);
  };

  return (
    <div className="inicio">
      {!showGame && <button onClick={handleButtonClick}>Jugar</button>}
      {showGame && <Game />}
    </div>
  );
};

export default MainPage;