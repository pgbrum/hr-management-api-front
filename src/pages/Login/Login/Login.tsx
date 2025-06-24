import React, { useState } from 'react';
import styles from './Login.module.css';

// 1. Importando o serviço (ajuste o caminho se for diferente no seu projeto)
import { loginService } from '../../../api/services/loginService';

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
      // 2. A chamada 'fetch' foi substituída pela chamada ao serviço.
      const data = await loginService.login({ email, password });

      sessionStorage.setItem('token', data.token);

      setSuccessMessage('Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      // 3. A captura de erro foi ajustada para o padrão do serviço/Axios.
      const apiErrorMessage = error.response?.data?.message || 'Credenciais inválidas ou erro no servidor.';
      setErrorMessage(apiErrorMessage);
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
          
          <button type="submit" className={styles.button}>
            Entrar
          </button>

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