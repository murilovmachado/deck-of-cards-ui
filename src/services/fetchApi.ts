import fetch from 'node-fetch';

type Success = {
  success: boolean;
}

const baseUrl = 'https://deckofcardsapi.com/api/deck';

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const fetchApi = async <T extends Success>(endPoint: string): Promise<T> => {
  const url = `${baseUrl}/${endPoint}`
  try {
    const response = await fetch(url, defaultOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export default fetchApi;
