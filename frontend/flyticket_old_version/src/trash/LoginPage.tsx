import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Вход в систему</h2>
      <LoginForm />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa',
  },
  title: {
    color: '#00796b',
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
};

export default LoginPage;
