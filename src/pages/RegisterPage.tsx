import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  register,
  registerFailed,
} from '../feature/register/registerAction.ts';
import { RootState } from '../store/reducers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormValue {
  email: string;
  password: string;
}

const initialValue: RegisterFormValue = { email: '', password: '' };

const RegisterScheme = Yup.object().shape({
  email: Yup.string().nullable().email('Невалидный email').required('Required'),
  password: Yup.string().required('Required'),
});

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, status } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && status === 'succeeded') {
      navigate('/tasks');
    }
  }, [dispatch, token, status]);

  if (status === 'loading') return <div>Отправка запроса для регистрации</div>;

  return (
    <div>
      <h1>Register:</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={RegisterScheme}
        onSubmit={(value: RegisterFormValue, { setSubmitting }) => {
          try {
            dispatch(register(value));
          } catch (error: any) {
            dispatch(registerFailed(error.message));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">email</label>
              <Field
                type="email"
                name="email"
                id="email"
                autoComplete="email"
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <Field
                type="password"
                name="password"
                id="password"
                autoComplete="password"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
