// src/components/BenefitsList.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BenefitsList.module.css';
import { Benefit } from '../../../types';
import { benefitsService } from '../../../api/services/benefitsService';

const BenefitsList: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBenefits = async () => {
    try {
      const data = await benefitsService.getAll();
      setBenefits(data);
    } catch (err) {
      console.error('Erro ao buscar benefícios:', err);
      setError('Falha ao carregar benefícios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchBenefits();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja DELETAR este benefício?')) return;
    await benefitsService.delete(id);
    fetchBenefits();
  };

  const handleEdit = async (benefit: Benefit) => {
    const newName = prompt('Novo nome do benefício:', benefit.name);
    if (newName === null) return;

    const newValueStr = prompt('Novo valor do benefício:', String(benefit.value));
    if (newValueStr === null) return;

    const newValue = parseFloat(newValueStr);
    if (isNaN(newValue)) {
      alert('Valor inválido.');
      return;
    }

    await benefitsService.update(benefit.id, { name: newName, value: newValue });
    fetchBenefits();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <div className={styles.stateContainer}>
        <p className={styles.loadingState}>Carregando benefícios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateContainer}>
        <p className={styles.errorState}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Lista de Benefícios</h2>
          <Link to="/benefits/create" className={styles.createButton}>
            Criar Novo Benefício
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeader}>Nome do Benefício</th>
                <th className={styles.tableHeader}>Valor</th>
                <th className={`${styles.tableHeader} ${styles.actionsHeader}`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit) => (
                <tr key={benefit.id} className={styles.tableRow}>
                  <td className={styles.tableCell} data-label="Nome">
                    {benefit.name}
                  </td>
                  <td className={styles.tableCell} data-label="Valor">
                    {formatCurrency(benefit.value)}
                  </td>
                  <td className={`${styles.tableCell} ${styles.actionsCell}`} data-label="Ações">
                    <button
                      onClick={() => handleEdit(benefit)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(benefit.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {benefits.length === 0 && (
          <p className={styles.emptyState}>Nenhum benefício encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default BenefitsList;
