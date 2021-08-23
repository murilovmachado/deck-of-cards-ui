import fetch from 'node-fetch';

const baseUrl = 'https://deckofcardsapi.com/api/deck';

export const requestDeck = () => fetch(`${baseUrl}/new`);

export const drawCard = (deckId: string) => fetch(`${baseUrl}/${deckId}/draw/?count=1`);