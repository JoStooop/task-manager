import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../../feature/register/registerAction.ts';
import { LOGOUT } from '../../feature/auth/authActions.ts';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AuthState {
  token: string | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') || null,
  status: 'idle',
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, status: 'loading', error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, token: action.payload, status: 'succeeded' };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    case LOGOUT:
      return { ...state, status: 'idle', error: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
