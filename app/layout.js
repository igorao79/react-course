import { Providers } from './providers';
import Layout from '../src/components/layout/Layout';
import '../src/reset.css';
import '../src/styles/globals.css';
import '../src/index.css';

export const metadata = {
  title: 'Restaurant Review App',
  description: 'Find the best restaurants in your area',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" style={{ width: '100%', height: '100%' }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body style={{ width: '100%', margin: 0, padding: 0 }}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
} 