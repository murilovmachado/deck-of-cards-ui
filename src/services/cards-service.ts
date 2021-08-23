import fetchApi from './fetchApi';

type RequestDeckResponse = {
  success: boolean;
  deck_id: string;
  shuffled: boolean,
  remaining: number;
}

type Card = {
  image: string;
  value: string;
  suit: string;
  code: string;
};

type DrawCardResponse = {
  success: boolean;
  cards: Card[];
  deck_id: string,
  remaining: number;
};

export const requestDeck = () => fetchApi<RequestDeckResponse>('new');

export const drawCard = (deckId: string) => fetchApi<DrawCardResponse>(`${deckId}/draw/?count=1`);
