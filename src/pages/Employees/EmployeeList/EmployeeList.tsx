import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // O Link é usado novamente
import styles from './EmployeeList.module.css';
import { Employee } from '../../../types';
import { employeesService } from '../../../api/services/employeesService';
import EmployeeForm from '../EmployeeForm/EmployeeForm';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeesService.getAll();
      setEmployees(data);
    } catch (err) {
      setError('Falha ao carregar funcionários.');
      console.error('Erro ao buscar funcionários:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja DELETAR este funcionário?')) return;
    await employeesService.delete(id);
    fetchEmployees();
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleFormSuccess = () => {
    handleCloseModal();
    fetchEmployees();
  };

  if (loading) return <div className={styles.stateContainer}><p className={styles.loadingState}>Carregando...</p></div>;
  if (error) return <div className={styles.stateContainer}><p className={styles.errorState}>{error}</p></div>;

  const filteredEmployees = employees.filter((employee) => {
    const term = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Lista de Funcionários</h2>
            <input
              type="text"
              placeholder="🔍 Buscar por nome ou email..." // Placeholder original restaurado
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* VOLTAMOS a usar o <Link> para a criação, como era originalmente. */}
            <Link to="/employees/create" className={styles.createButton}>
              Cadastrar Funcionário
            </Link>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableRow}>
                  <th className={styles.tableHeader}>Nome</th>
                  <th className={styles.tableHeader}>Email</th>
                  <th className={styles.tableHeader}>Cargo</th>
                  <th className={styles.tableHeader}>Nº de Benefícios</th>
                  <th className={`${styles.tableHeader} ${styles.actionsHeader}`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className={styles.tableRow}>
                    {/* CORREÇÃO: Adicionamos a classe {styles.tableCell} de volta em todas as <td>. */}
                    <td className={styles.tableCell} data-label="Nome">
                      {employee.name}
                    </td>
                    <td className={styles.tableCell} data-label="Email">
                      {employee.email}
                    </td>
                    <td className={styles.tableCell} data-label="Cargo">
                      {employee.position?.title ?? 'N/A'}
                    </td>
                    <td className={styles.tableCell} data-label="Benefícios">
                      {employee.benefits?.length ?? 0}
                    </td>
                    <td className={`${styles.tableCell} ${styles.actionsCell}`} data-label="Ações">
                      <button onClick={() => handleEdit(employee)} className={`${styles.actionButton} ${styles.editButton}`}>Editar</button>
                      <button onClick={() => handleDelete(employee.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && !loading && (
            <p className={styles.emptyState}>
              {searchTerm 
                ? `Nenhum funcionário encontrado para "${searchTerm}".`
                : 'Nenhum funcionário cadastrado.'
              }
            </p>
          )}
        </div>
      </div>
      
      {/* O modal de edição continua funcionando perfeitamente */}
      {isModalOpen && (
        <EmployeeForm
          employeeToEdit={selectedEmployee}
          onClose={handleCloseModal}
          onFormSubmit={handleFormSuccess}
        />
      )}
    </>
  );
};

export default EmployeeList;