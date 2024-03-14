interface JokesState {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: JokesState = {
  loading: false,
  data: [],
  error: null,
};

type JokesAction =
  | { type: 'FETCH_JOKES_REQUEST' }
  | { type: 'FETCH_JOKES_SUCCESS'; payload: any[] }
  | { type: 'FETCH_JOKES_FAILURE'; error: string };

export const jokesReducer = (state: JokesState = initialState, action: JokesAction): JokesState => {
  switch (action.type) {
  case 'FETCH_JOKES_REQUEST': 
    return { ...state, loading: true, error: null };
  case 'FETCH_JOKES_SUCCESS':
    return { ...state, loading: false, data: action.payload };
  case 'FETCH_JOKES_FAILURE':
    return { ...state, loading: false, error: action.error };
  default:
    return state;
  }
};
