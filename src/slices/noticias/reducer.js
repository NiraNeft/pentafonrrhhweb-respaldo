import axios from 'axios';

const GET_NOTICIAS_REQUEST = 'GET_NOTICIAS_REQUEST';
const GET_NOTICIAS_SUCCESS = 'GET_NOTICIAS_SUCCESS';
const GET_NOTICIAS_FAILURE = 'GET_NOTICIAS_FAILURE';

const initialState = {
  lista: [],
  loading: false,
  error: null,
};

export const getNoticias = () => async (dispatch) => {
  dispatch({ type: GET_NOTICIAS_REQUEST });
  try {
    const response = await axios.get('/api/noticias');
    dispatch({ type: GET_NOTICIAS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_NOTICIAS_FAILURE, payload: error });
  }
};

const noticiasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICIAS_REQUEST:
      return { ...state, loading: true };
    case GET_NOTICIAS_SUCCESS:
      return { ...state, loading: false, lista: action.payload };
    case GET_NOTICIAS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default noticiasReducer;