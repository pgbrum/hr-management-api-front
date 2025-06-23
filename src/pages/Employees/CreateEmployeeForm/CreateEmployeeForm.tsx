// src/components/CreateEmployeeForm.tsx
import React, { useState } from 'react';
import styles from './CreateEmployeeForm.module.css';
import { employeesService } from '../../../api/services/employeesService';

const CreateEmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [positionId, setPositionId] = useState('');
  const [benefits, setBenefits] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const benefitsArray = benefits
      .split(',')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    try {
      await employeesService.create({
        name,
        email,
        positionId: positionId || null,
        benefits: benefitsArray.length > 0 ? benefitsArray : [],
      });

      setSuccessMessage('Funcionário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPositionId('');
      setBenefits('');
    } catch (error) {
      setErrorMessage('Erro ao cadastrar funcionário. Verifique os dados.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastrar Novo Funcionário</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Corporativo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: joao.silva@empresa.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="positionId">ID do Cargo</label>
            <input
              type="text"
              id="positionId"
              value={positionId}
              onChange={(e) => setPositionId(e.target.value)}
              placeholder="Deixe em branco se não aplicável"
            />
            <small className={styles.formHint}>Este campo é opcional.</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="benefits">IDs dos Benefícios</label>
            <input
              type="text"
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="Ex: id_beneficio_1, id_beneficio_2"
            />
            <small className={styles.formHint}>Separe os IDs por vírgula. Campo opcional.</small>
          </div>

          <button type="submit" className={styles.button}>
            Cadastrar Funcionário
          </button>

          {successMessage && (
            <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>
          )}
          {errorMessage && (
            <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
