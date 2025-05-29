import { useEffect, useState } from 'react';
import classNames from 'classnames';
import ProgressBar from '../progress-bar/ProgressBar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <ProgressBar />
      <header className={styles.header}>
        <h1 className={styles.title}>Restaurant Review App</h1>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Restaurant Review App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 