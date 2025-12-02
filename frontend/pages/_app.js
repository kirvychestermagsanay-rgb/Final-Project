import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const publicPages = ['/login'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isPublicPage = publicPages.includes(router.pathname);

    if (!user && !isPublicPage) {
      router.push('/login');
    }

    if (user && router.pathname === '/login') {
      router.push('/');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
