import React, { useState } from 'react';
import { requestDeck } from '../services/cards-service';
import '../styles/game.css';

const Game = () => {
  const [playerADeck, setPlayerADeck] = useState<string>();
  const [playerBDeck, setPlayerBDeck] = useState<string>();

  const handleStartGame = async () => {
    try {
      const [responseA, responseB] = await Promise.all([requestDeck(), requestDeck()]);
      setPlayerADeck(responseA.deck_id);
      setPlayerBDeck(responseB.deck_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="game">
      <header className="game-header">
        <input type="button" value="Start Game" onClick={handleStartGame} />
        <span>Player A: {playerADeck}</span>
        <span>Player B: {playerBDeck}</span>
      </header>
    </div>
  );
};

export default Game;
