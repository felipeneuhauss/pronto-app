import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from 'hooks/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' });
  const router = useRouter();

  const checkUser = useCallback(async () => {
    if (user) {
      return router.push('/admin/dashboard');
    }
    router.push('/login');
  }, [user]);

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <>
      <Head>
        <title>ProntoSaude</title>
      </Head>

      <div
        className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
      >
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
          {user
            ? (
              <>
                <Link href="/admin/dashboard">
                  <a className="ml-4 text-sm text-gray-700 underline">
                    Dashboard
                  </a>
                </Link>
                <Link href="/admin/suppliers">
                  <a className="ml-4 text-sm text-gray-700 underline">
                    Representadas
                  </a>
                </Link>
                <Link href="/admin/sellers">
                  <a className="ml-4 text-sm text-gray-700 underline">
                    Utilizadores
                  </a>
                </Link>
                <Link href="/admin/customers">
                  <a className="ml-4 text-sm text-gray-700 underline">
                    Clientes
                  </a>
                </Link>
              </>
            )
            : (
              <>
                <Link href="/login">
                  <a className="text-sm text-gray-700 underline">Login</a>
                </Link>

                {/* <Link href="/register"> */}
                {/*   <a className="ml-4 text-sm text-gray-700 underline"> */}
                {/*                       Register */}
                {/*   </a> */}
                {/* </Link> */}
              </>
            )}
        </div>

        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
            <img src="/images/logo.png" alt="Logo ProntoSaude" />
          </div>
        </div>
      </div>
    </>
  );
}
