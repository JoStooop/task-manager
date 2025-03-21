import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login, loginFailed } from '../feature/auth/authActions.ts';
import { fetchTasksFailed } from '../feature/tasks/tasksActions.ts';
import { useEffect } from 'react';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};

const LoginScheme = Yup.object().shape({
  email: Yup.string().nullable().email('Невалидный email').required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && status === 'succeeded') {
      navigate('/tasks');
    }
  }, [token, status, navigate]);

  if (status === 'loading') return <div>Отправка запроса...</div>;

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginScheme}
        onSubmit={(values: LoginFormValues, { setSubmitting }) => {
          try {
            dispatch(login(values));
          } catch (error: any) {
            dispatch(loginFailed(error.message));
            console.error('Login failed:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                autoComplete="password"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
