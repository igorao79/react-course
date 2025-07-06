import { Providers } from './providers';
import Layout from '@components/layout/Layout';
import '../src/reset.css';
import '../src/styles/globals.css';
import '../src/index.css';
import styles from './layout.module.css';

export const metadata = {
  title: 'Restaurant Review App',
  description: 'Find the best restaurants in your area',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={styles.html}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={styles.body}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
} 