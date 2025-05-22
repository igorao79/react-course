import React from 'react';

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Restaurant App</h1>
      </header>
      
      <main className="content">
        {children}
      </main>
      
      <footer className="footer">
        <p>© 2025 Restaurant App</p>
      </footer>
    </div>
  );
}

export default Layout; 