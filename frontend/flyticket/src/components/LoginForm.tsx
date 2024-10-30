import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [iin, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Здесь логика входа
    console.log('ИИН:', iin);
    console.log('Пароль:', password);
  };

  return (
    <div style={styles.formContainer}>
      <input
        style={styles.input}
        type="text"
        placeholder="ИИН"
        value={iin}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    gap: '1rem',
    width: '300px',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #00796b',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    backgroundColor: '#00796b',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LoginForm;
