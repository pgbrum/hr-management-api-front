import React, { useState, useEffect, useRef } from 'react';
import styles from './PositionForm.module.css';
import { positionsService } from '../../../api/services/positionsService';
import { Position } from '../../../types';

type PositionFormProps = {
  positionToEdit: Position | null;
  onClose: () => void;
  onFormSubmit: () => void;
};

const PositionForm: React.FC<PositionFormProps> = ({ positionToEdit, onClose, onFormSubmit }) => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState<number | ''>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (positionToEdit) {
      setTitle(positionToEdit.title);
      setSalary(positionToEdit.salary);
    }
  }, [positionToEdit]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    const payload = {
      title,
      salary: Number(salary),
    };

    try {
      if (positionToEdit) {
        await positionsService.update(positionToEdit.id, payload);
        setSuccessMessage('Cargo atualizado com sucesso!');
      } else {
        await positionsService.create(payload);
        setSuccessMessage('Cargo cadastrado com sucesso!');
      }
      onFormSubmit();
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setErrorMessage('Erro ao salvar cargo. Verifique os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard} ref={modalRef}>
        <button onClick={onClose} className={styles.closeButton} disabled={isLoading}>×</button>
        <h2 className={styles.title}>
          {positionToEdit ? 'Editar Cargo' : 'Cadastrar Novo Cargo'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Nome do Cargo</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Desenvolvedor(a) Pleno"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="salary">Salário (R$)</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={e => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ex: 5000.00"
              step="0.01"
              required
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>

          {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
          {errorMessage && <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default PositionForm;