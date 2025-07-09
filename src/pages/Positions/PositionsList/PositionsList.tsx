import React, { useEffect, useState } from 'react';
import styles from './PositionsList.module.css';
import { Position } from '../../../types';
import { positionsService } from '../../../api/services/positionsService';
import PositionForm from '../PositionForm/PositionForm';

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const data = await positionsService.getAll();
      setPositions(data);
    } catch (err) {
      setError('Falha ao carregar cargos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja DELETAR este cargo?')) return;
    await positionsService.delete(id);
    fetchPositions();
  };

  const handleEdit = (position: Position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPosition(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  const handleFormSuccess = () => {
    handleCloseModal();
    fetchPositions();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) return <div className={styles.stateContainer}><p className={styles.loadingState}>Carregando...</p></div>;
  if (error) return <div className={styles.stateContainer}><p className={styles.errorState}>{error}</p></div>;

  const filteredPositions = positions.filter((position) =>
    position.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Lista de Cargos</h2>
            <input
              type="text"
              placeholder="🔍 Buscar por nome do cargo..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleCreate} className={styles.createButton}>
              Criar Novo Cargo
            </button>
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
                {filteredPositions.map((position) => (
                  <tr key={position.id} className={styles.tableRow}>
                    <td className={styles.tableCell} data-label="Cargo">{position.title}</td>
                    <td className={styles.tableCell} data-label="Salário">{formatCurrency(position.salary)}</td>
                    <td className={`${styles.tableCell} ${styles.actionsCell}`} data-label="Ações">
                      <button onClick={() => handleEdit(position)} className={`${styles.actionButton} ${styles.editButton}`}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(position.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPositions.length === 0 && !loading && (
            <p className={styles.emptyState}>
              {searchTerm
                ? `Nenhum cargo encontrado para "${searchTerm}".`
                : 'Nenhum cargo cadastrado.'
              }
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PositionForm
          positionToEdit={selectedPosition}
          onClose={handleCloseModal}
          onFormSubmit={handleFormSuccess}
        />
      )}
    </>
  );
};

export default PositionList;