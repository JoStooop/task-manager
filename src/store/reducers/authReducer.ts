interface authState {
  token: null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: authState = {
  token: null,
  status: 'idle',
  error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: 'succeeded',
        token: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
