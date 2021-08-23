import React from 'react';
import type { Player } from './game';

type Props = {
  player: Player;
}

const PlayerDetails: React.FC<Props> = ({ player }) =>
  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 226  }}>
    <img src={player.currentCard?.image} alt={`${player.currentCard?.value} of ${player.currentCard?.suit}`} />
    <span>{player.name}</span>
    <span>Points: {player.points}</span>
    <br/>
    <span>Remaining: {player.remaining}</span>
  </div>;

export default PlayerDetails;