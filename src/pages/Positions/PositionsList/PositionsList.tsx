// src/components/PositionList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PositionsList.module.css';
import { Position } from '../../../types';
import { positionsService } from '../../../api/services/positionsService';

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async () => {
    try {
      const data = await positionsService.getAll();
      setPositions(data);
    } catch (err) {
      console.error('Erro ao buscar cargos:', err);
      setError('Falha ao carregar cargos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPositions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja DELETAR este cargo?')) return;
    await positionsService.delete(id);
    fetchPositions();
  };

  const handleEdit = async (position: Position) => {
    const newTitle = prompt('Novo nome do cargo:', position.title);
    if (newTitle === null) return;

    const newSalaryStr = prompt('Novo salário:', String(position.salary));
    if (newSalaryStr === null) return;

    const newSalary = parseFloat(newSalaryStr);
    if (isNaN(newSalary)) {
      alert('Salário inválido.');
      return;
    }

    await positionsService.update(position.id, { title: newTitle, salary: newSalary });
    fetchPositions();
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
        <p className={styles.loadingState}>Carregando cargos...</p>
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
          <h2 className={styles.title}>Lista de Cargos</h2>
          <Link to="/positions/create" className={styles.createButton}>
            Criar Novo Cargo
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeader}>Nome do Cargo</th>
                <th className={styles.tableHeader}>Salário</th>
                <th className={`${styles.tableHeader} ${styles.actionsHeader}`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className={styles.tableRow}>
                  <td className={styles.tableCell} data-label="Cargo">{position.title}</td>
                  <td className={styles.tableCell} data-label="Salário">{formatCurrency(position.salary)}</td>
                  <td className={`${styles.tableCell} ${styles.actionsCell}`} data-label="Ações">
                    <button
                      onClick={() => handleEdit(position)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(position.id)}
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

        {positions.length === 0 && !loading && (
          <p className={styles.emptyState}>Nenhum cargo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PositionList;
