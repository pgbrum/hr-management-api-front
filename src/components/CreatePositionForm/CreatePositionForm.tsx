// src/components/CreatePositionForm.tsx
import React, { useState } from 'react';
import styles from './CreatePositionForm.module.css'; // Importando os estilos

const CreatePositionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState<number | ''>(''); // Melhor para campos de número
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3333/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          salary: Number(salary),
        }),
      });

      if (response.ok) {
        setSuccessMessage('Cargo cadastrado com sucesso!');
        setTitle('');
        setSalary('');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Erro desconhecido');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao conectar com a API.');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastrar Novo Cargo</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Nome do Cargo</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Desenvolvedor(a) Sênior"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="salary">Salário (R$)</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ex: 8500.00"
              step="0.01" // Permite casas decimais
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Cadastrar Cargo
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

export default CreatePositionForm;