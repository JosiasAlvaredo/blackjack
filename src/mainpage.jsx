import React, { useState } from 'react';
import Game from './Game';

const MainPage = () => {
  const [showGame, setShowGame] = useState(false);

  const handleButtonClick = () => {
    setShowGame(true);
  };

  return (
    <div>
      {!showGame && <button onClick={handleButtonClick}>Show Game</button>}
      {showGame && <Game />}
    </div>
  );
};

export default MainPage;