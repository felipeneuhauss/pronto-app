import useSWR from 'swr';
import axios from 'lib/axios';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'hooks/local-storage';
import { isAdmin } from 'lib/profile';

function handleErrors(setErrors: (value: any) => void) {
  return (e: any) => {
    if (e.response.status !== 422) throw e;

    setErrors(Object.values(e.response.data.errors).flat());
  };
}

type UseAuthProps = { middleware?: string, redirectIfAuthenticated?: string };

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuthProps = {}) => {
  const router = useRouter();
  const [, setToken] = useLocalStorage('token', '');

  const {
    data: user,
    error,
    revalidate,
  } = useSWR('/api/whoami', () => axios
    .get('/api/whoami')
    .then(async (res) => {
      const { data: userLoaded } = res.data;
      if (!isAdmin(userLoaded) && ['/admin/beneficiaries', '/admin/users'].includes(router.pathname)) {
        await router.push('/404');
      }
      return userLoaded;
    })
    .catch((e) => {
      if (e.response.status !== 409) throw e;

      router.push('/verify-email');
    }));
  const register = async ({
    setErrors,
    ...props
  }: {
      setErrors: (value: any) => void,
      name: string,
      email: string,
      password: string,
      passworConfirmation: string
  }) => {
    setErrors([]);

    axios
      .post('/register', props)
      .then(() => (window.location.pathname = '/login'))
      .catch(handleErrors(setErrors));
  };

    type LoginProps = {
        username: string,
        password: string,
        setErrors: Dispatch<SetStateAction<never[]>>;
        setStatus: Dispatch<SetStateAction<null>>
    };

    const login = async ({
      setErrors,
      setStatus,
      username,
      password,
    }: LoginProps) => {
      setErrors([]);
      setStatus(null);
      axios
        .post('/api/auth/token', {
          username,
          password,
          device_name: 'app_backoffice',
        })
        .then(({ data }) => {
          setToken(data);
          revalidate();
        })
        .catch((e) => {
          if (e.response?.status !== 422) throw e;
          if (e.response?.data?.errors) {
            // @ts-ignore
            setErrors(Object.values(e.response?.data?.errors).flat());
          }
        });
    };
    const forgotPassword = async ({
      setErrors,
      setStatus,
      email,
    }: { setErrors: (value: any) => void, setStatus: (value: any) => void, email: string }) => {
      setErrors([]);
      setStatus(null);

      axios
        .post('/api/password/email', {
          email,
          origin: window.location.origin,
        })
        .then((response) => setStatus(response.data.status))
        .catch(handleErrors(setErrors));
    };

    type ResetPasswordProps = {
        setErrors: (value: any) => void;
        setStatus: (value: any) => void;
        email: string;
        password: string;
        passwordConfirmation: string;
    };
    const resetPassword = async ({
      setErrors,
      setStatus,
      email,
      password,
      passwordConfirmation,
    }: ResetPasswordProps) => {
      setErrors([]);
      setStatus(null);

      axios
        .post('/reset-password', {
          token: router.query.token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        })
        .then((response) => router.push(`/login?reset=${Buffer.from(response.data.status, 'utf8').toString('base64')}`))
        .catch((e) => {
          if (e.response && e.response?.status !== 422) throw error;

          setErrors(Object.values(e.response.data.errors).flat());
        });
    };

    const resendEmailVerification = ({ setStatus }: { setStatus: (value: any) => void }) => {
      axios
        .post('/email/verification-notification')
        .then((response) => setStatus(response.data.status));
    };

    const logout = async () => {
      if (!error) {
        setToken(null);
        revalidate();
      }

      window.location.pathname = '/login';
    };

    useEffect(() => {
      if (middleware === 'guest' && redirectIfAuthenticated && user) {
        router.push(redirectIfAuthenticated);
      }
      if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return {
      user,
      register,
      login,
      forgotPassword,
      resetPassword,
      resendEmailVerification,
      logout,
    };
};
