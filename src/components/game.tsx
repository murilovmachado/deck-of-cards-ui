import React, { useState, useEffect } from 'react';
import { drawCard, requestDeck, shuffleDeck, DrawCardResponse } from '../services/cards-service';
import '../styles/game.css';
import PlayerDetails from './player-details';
import Winner from './winner';

type Card = {
  image: string;
  value: string;
  suit: string;
  code: string;
};

export type Player = {
  name: string;
  deckId: string;
  remaining: number;
  points: number;
  currentCard?: Card;
};

export type Tie = {
  name?: undefined;
}

const Game = () => {
  const [playerA, setPlayerA] = useState<Player>();
  const [playerB, setPlayerB] = useState<Player>();
  const [winner, setWinner] = useState<Player | Tie>();

  useEffect(() => {
    if (!playerA || !playerB) return;
    
    if (playerA.remaining === 0 || playerB.remaining === 0) {
      if (playerA?.points > playerB?.points) {
        setWinner(playerA);
      } else if (playerB?.points > playerA?.points) {
        setWinner(playerB);
      } else {
        setWinner({});
      }
    }
  }, [playerA, playerB]);

  const handleStartGame = async () => {
    try {
      const [responseA, responseB] = await Promise.all([requestDeck(), requestDeck()]);
      const [shuffledA, shufffledB] = await Promise.all([shuffleDeck(responseA.deck_id), shuffleDeck(responseB.deck_id)]);
      const playerA = {
        name: 'Player A',
        deckId: shuffledA.deck_id,
        remaining: shuffledA.remaining,
        points: 0,
      };
      const playerB = {
        name: 'Player B',
        deckId: shufffledB.deck_id,
        remaining: shufffledB.remaining,
        points: 0,
      };
      setPlayerA(playerA);
      setPlayerB(playerB);
      handleDrawCard(playerA, playerB);
    } catch (err) {
      console.log('Error starting game: ', err);
    }
  };

  const specialCards: { [value: string]: number } = {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
  };

  const getCardValue = (card: Card) => specialCards[card.value] || Number(card.value);

  const getPoints = (responseA: DrawCardResponse, responseB: DrawCardResponse) => {
    if (!playerA || !playerB) return [];

    const cardAValue = getCardValue(responseA.cards[0]);
    const cardBValue = getCardValue(responseB.cards[0]);

    let pointsA = playerA.points;
    let pointsB = playerB.points;

    if (cardAValue > cardBValue) {
      pointsA++;
    } else if (cardBValue > cardAValue) {
      pointsB++;
    }

    return [pointsA, pointsB];
  };

  const handleDrawCard = async (playerA?: Player, playerB?: Player) => {
    try {
      if (playerA === undefined || playerB === undefined) {
        console.log('Please hit Draw Card again');
        return;
      };

      const [responseA, responseB] = await Promise.all([drawCard(playerA.deckId), drawCard(playerB.deckId)]);

      // Finish Game Early
      if (responseA.success === false && responseA.remaining === 0) {
        setPlayerA({ ...playerA, remaining: 0});
        return;
      } else if ((responseB.success === false && responseB.remaining === 0)) {
        setPlayerB({ ...playerB, remaining: 0});
        return;
      }

      const [pointsA, pointsB] = getPoints(responseA, responseB);

      const updatedPlayerA = {
        ...playerA,
        remaining: responseA.remaining,
        points: pointsA,
        currentCard: responseA.cards[0],
      }
      const updatedPlayerB = {
        ...playerB,
        remaining: responseB.remaining,
        points: pointsB,
        currentCard: responseB.cards[0],
      }

      setPlayerA(updatedPlayerA);
      setPlayerB(updatedPlayerB);
    } catch (err) {
      console.log('Error drawing card: ', err);
    }
  };

  const showStartGame = !winner && playerA === undefined && playerB === undefined;
  const showDrawCard = !winner && playerA && playerB && (playerA.remaining > 0 && playerB.remaining > 0);

  return (
    <div className="game">
      <header className="game-header">
        {showStartGame && <input type="button" value="Start Game" onClick={handleStartGame} />}
        {winner && <Winner player={winner} />}
        {showDrawCard && <input type="button" value="Draw Card" onClick={() => handleDrawCard(playerA, playerB)} />}
        {showDrawCard && <span style={{ fontSize: '11px' }}>(Click again if it doesnt work)</span>}
        {!winner && playerA && playerB && (
          <div style={{ display: 'flex'}}>
            <PlayerDetails player={playerA} />
            <PlayerDetails player={playerB} />
          </div>
        )}
      </header>
    </div>
  );
};

export default Game;
