import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchJokes = (query: string) => async (dispatch: Dispatch) => {
  try { 
    dispatch({ type: 'FETCH_JOKES_REQUEST' });
    const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
    dispatch({ type: 'FETCH_JOKES_SUCCESS', payload: response.data.result });
  } catch (error) {
    dispatch({ type: 'FETCH_JOKES_FAILURE', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
