// src/components/CreateAdminForm.tsx
import React, { useState } from 'react';
import styles from './CreateAdminForm.module.css'; // Importando os estilos

const CreateAdminForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        throw new Error('Você não está autenticado. Faça login novamente.');
      }

      const response = await fetch('http://localhost:3333/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar admin');
      }

      setSuccessMessage('Admin cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setErrorMessage(error.message || 'Não foi possível completar o cadastro.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastrar Novo Administrador</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Administrador</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Maria Souza"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: maria.souza@empresa.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6} // Boa prática para senhas
              required
            />
            <small className={styles.formHint}>A senha deve ter no mínimo 6 caracteres.</small>
          </div>

          <button type="submit" className={styles.button}>
            Cadastrar Admin
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

export default CreateAdminForm;