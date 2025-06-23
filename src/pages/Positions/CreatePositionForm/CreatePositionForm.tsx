// src/components/CreatePositionForm.tsx
import React, { useState } from 'react';
import styles from './CreatePositionForm.module.css';
import { positionsService } from '../../../api/services/positionsService';

const CreatePositionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState<number | ''>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await positionsService.create({
        title,
        salary: Number(salary),
      });

      setSuccessMessage('Cargo cadastrado com sucesso!');
      setTitle('');
      setSalary('');
    } catch (err: any) {
      setErrorMessage('Erro ao cadastrar cargo. Verifique os dados.');
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
              onChange={(e) =>
                setSalary(e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder="Ex: 8500.00"
              step="0.01"
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
