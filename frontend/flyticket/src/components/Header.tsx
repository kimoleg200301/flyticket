// Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.headerContainer}>
      <h1 style={styles.title}>Flyticket</h1>
    </header>
  );
};

const styles = {
  headerContainer: {
    width: '100%',
    padding: '1rem 0',
    backgroundColor: '#00796b',
    textAlign: 'center' as 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.8rem',
  },
};

export default Header;
