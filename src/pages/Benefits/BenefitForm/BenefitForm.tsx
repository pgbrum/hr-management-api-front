import React, { useState, useEffect, useRef } from 'react';
import styles from './BenefitForm.module.css';
import { benefitsService } from '../../../api/services/benefitsService';
import { Benefit } from '../../../types';

type BenefitFormProps = {
  benefitToEdit: Benefit | null;
  onClose: () => void;
  onFormSubmit: () => void;
};

const BenefitForm: React.FC<BenefitFormProps> = ({ benefitToEdit, onClose, onFormSubmit }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (benefitToEdit) {
      setName(benefitToEdit.name);
      setValue(benefitToEdit.value);
    }
  }, [benefitToEdit]);
  
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
      name,
      value: Number(value),
    };

    try {
      if (benefitToEdit) {
        await benefitsService.update(benefitToEdit.id, payload);
        setSuccessMessage('Benefício atualizado com sucesso!');
      } else {
        await benefitsService.create(payload);
        setSuccessMessage('Benefício cadastrado com sucesso!');
      }
      onFormSubmit();
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setErrorMessage('Erro ao salvar benefício. Verifique os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard} ref={modalRef}>
        <button onClick={onClose} className={styles.closeButton} disabled={isLoading}>×</button>
        <h2 className={styles.title}>
          {benefitToEdit ? 'Editar Benefício' : 'Cadastrar Novo Benefício'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Benefício</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: Vale Refeição"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="value">Valor (R$)</label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ex: 500.50"
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

export default BenefitForm;