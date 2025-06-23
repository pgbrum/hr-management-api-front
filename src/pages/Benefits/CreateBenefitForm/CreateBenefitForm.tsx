// src/components/CreateBenefitForm.tsx

import React, { useState } from 'react';
import styles from './CreateBenefitForm.module.css';
import { benefitsService } from '../../../api/services/benefitsService';

const CreateBenefitForm: React.FC = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await benefitsService.create({ name, value: Number(value) });

      setSuccessMessage('Benefício cadastrado com sucesso!');
      setName('');
      setValue('');
    } catch {
      setErrorMessage('Erro ao cadastrar benefício. Verifique os dados.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastrar Novo Benefício</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Benefício</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Vale Refeição, Plano de Saúde"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="value">Valor (R$)</label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) =>
                setValue(e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder="Ex: 500.50"
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Cadastrar
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

export default CreateBenefitForm;
