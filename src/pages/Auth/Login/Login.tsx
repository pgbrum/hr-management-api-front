import React, { useState } from 'react';
import styles from './Login.module.css';

import { loginService } from '../../../api/services/loginService'; // Ajuste o caminho se necessário

type LoginProps = {
  onLoginSuccess: () => void;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const data = await loginService.login({ email, password });
      sessionStorage.setItem('token', data.token);
      
      onLoginSuccess();

    } catch (error: any) {
      const apiErrorMessage = error.response?.data?.message || 'Credenciais inválidas.';
      setErrorMessage(apiErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Acesse a Plataforma</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          {errorMessage && (
            <p className={`${styles.message} ${styles.error}`}>
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;