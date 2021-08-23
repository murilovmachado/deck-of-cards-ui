import React from 'react';
import type { Player, Tie } from './game';

type Props = {
  player: Player | Tie;
}

const Winner: React.FC<Props> = ({ player }) => {
  const winner = player.name;

  if (winner) {
   return <div>The Winner is {winner}!!</div>;
  } else {
    return <div>It's a Tie!</div>
  }
};

export default Winner;