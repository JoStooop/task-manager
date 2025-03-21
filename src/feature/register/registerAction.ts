import { AppThunk } from '../../types.ts';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (token: string) => ({
  type: REGISTER_SUCCESS,
  payload: token,
});

export const registerFailed = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (credential: {
  email: string;
  password: string;
}): AppThunk => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      dispatch(registerSuccess(data.token));
      localStorage.setItem('authToken', data.token);
    } catch (error: any) {
      dispatch(registerFailed(error.message));
    }
  };
};
