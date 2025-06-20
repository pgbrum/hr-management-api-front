// src/components/Login/Login.tsx
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3333/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas.');
      }

      sessionStorage.setItem('token', data.token);

      setSuccessMessage('Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setErrorMessage(error.message || 'Não foi possível fazer login.');
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
            />
          </div>
          
          {/* A ÚNICA ALTERAÇÃO ESTÁ AQUI: adicionamos a classe ao botão */}
          <button type="submit" className={styles.button}>
            Entrar
          </button>

          {/* As mensagens de erro/sucesso agora aparecem acima do botão */}
          {successMessage && (
            <p className={`${styles.message} ${styles.success}`}>
              {successMessage}
            </p>
          )}
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