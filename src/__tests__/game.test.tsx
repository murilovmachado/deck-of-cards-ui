import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../components/game';

test('renders start game button', () => {
  render(<Game />);
  const button = screen.getByText(/Start Game/i);
  expect(button).toBeInTheDocument();
});
