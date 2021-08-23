import fetch from 'node-fetch';

type Success = {
  success: boolean;
}

const baseUrl = 'https://deckofcardsapi.com/api/deck';

const fetchApi = async <T extends Success>(endPoint: string): Promise<T> => {
  const url = `${baseUrl}/${endPoint}`
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result.success) {
      return result;
    } else {
      throw new Error('Uknown Error');
    }
  } catch (error) {
    throw error;
  }
};

export default fetchApi;
