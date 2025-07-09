import React, { useEffect, useState } from 'react';
import styles from './BenefitsList.module.css';
import { Benefit } from '../../../types';
import { benefitsService } from '../../../api/services/benefitsService';
import BenefitForm from '../BenefitForm/BenefitForm';

const BenefitsList: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const data = await benefitsService.getAll();
      setBenefits(data);
    } catch (err) {
      setError('Falha ao carregar benefícios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja DELETAR este benefício?')) return;
    await benefitsService.delete(id);
    fetchBenefits();
  };

  const handleEdit = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedBenefit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBenefit(null);
  };

  const handleFormSuccess = () => {
    handleCloseModal();
    fetchBenefits();
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) return <div className={styles.stateContainer}><p className={styles.loadingState}>Carregando...</p></div>;
  if (error) return <div className={styles.stateContainer}><p className={styles.errorState}>{error}</p></div>;

  const filteredBenefits = benefits.filter((benefit) =>
    benefit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Lista de Benefícios</h2>
            <input
              type="text"
              placeholder="🔍 Buscar por nome do benefício..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleCreate} className={styles.createButton}>
              Criar Novo Benefício
            </button>
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
                {filteredBenefits.map((benefit) => (
                  <tr key={benefit.id} className={styles.tableRow}>
                    <td className={styles.tableCell} data-label="Nome">{benefit.name}</td>
                    <td className={styles.tableCell} data-label="Valor">{formatCurrency(benefit.value)}</td>
                    <td className={`${styles.tableCell} ${styles.actionsCell}`} data-label="Ações">
                      <button onClick={() => handleEdit(benefit)} className={`${styles.actionButton} ${styles.editButton}`}>Editar</button>
                      <button onClick={() => handleDelete(benefit.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBenefits.length === 0 && !loading && (
            <p className={styles.emptyState}>
              {searchTerm ? `Nenhum benefício encontrado para "${searchTerm}".` : 'Nenhum benefício cadastrado.'}
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <BenefitForm
          benefitToEdit={selectedBenefit}
          onClose={handleCloseModal}
          onFormSubmit={handleFormSuccess}
        />
      )}
    </>
  );
};

export default BenefitsList;