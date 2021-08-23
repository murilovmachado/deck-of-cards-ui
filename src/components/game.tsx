import React from 'react';
import '../styles/game.css';

const Game = () => {
  const handleStartGame = () => console.log('Start Game');

  return (
    <div className="game">
      <header className="game-header">
        <input type="button" value="Start Game" onClick={handleStartGame} />
      </header>
    </div>
  );
};

export default Game;
