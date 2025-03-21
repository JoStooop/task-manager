import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../../store/reducers/authReducer.ts';
import { AppThunk } from '../../types.ts';
import { toast } from 'react-toastify';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailed = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (credential: {
  email: string;
  password: string;
}): AppThunk => {
  return async (dispatch: any) => {
    dispatch(loginRequest());
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      dispatch(loginSuccess(data.token));
      localStorage.setItem('authToken', data.token);
    } catch (error: any) {
      console.log(error);
      dispatch(loginFailed(error.message));
    }
  };
};

export const LOGOUT = 'LOGOUT';

export const logout = (): AppThunk => {
  return async (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch({ type: LOGOUT });
    toast.success('Logout');
  };
};
