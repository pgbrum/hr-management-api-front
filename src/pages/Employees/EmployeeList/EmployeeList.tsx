// src/components/EmployeeList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EmployeeList.module.css'; // Importando os estilos
import { Employee } from '../../../types';

const API_BASE_URL = 'http://localhost:3333/employees';


const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lógica de fetch e handlers mantida conforme o original
  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
      const data = await response.json();
      setEmployees(data.employees);
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err);
      setError('Falha ao carregar funcionários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Tem certeza que deseja DELETAR este funcionário?`)) {
      return;
    }
    await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  const handleEdit = async (employee: Employee) => {
    // A lógica de prompt foi mantida para focar na estilização
    const newName = prompt('Novo nome:', employee.name);
    if (newName === null) return;
    const newEmail = prompt('Novo email:', employee.email);
    if (newEmail === null) return;
    const newPositionId = prompt('Novo ID do Cargo:', employee.position?.id || '');
    if (newPositionId === null) return;
    const newBenefitsStr = prompt('Novos benefícios (IDs separados por vírgula):', employee.benefits.join(', '));
    if (newBenefitsStr === null) return;

    await fetch(`${API_BASE_URL}/${employee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        positionId: newPositionId || null,
        benefits: newBenefitsStr.split(',').map(b => b.trim()).filter(b => b !== ''),
      }),
    });
    fetchEmployees();
  };
  
  if (loading) {
    return (
      <div className={styles.stateContainer}>
        <p className={styles.loadingState}>Carregando funcionários...</p>
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
          <h2 className={styles.title}>Lista de Funcionários</h2>
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
              {employees.map((employee) => (
                <tr key={employee.id} className={styles.tableRow}>
                  <td className={styles.tableCell} data-label="Nome">{employee.name}</td>
                  <td className={styles.tableCell} data-label="Email">{employee.email}</td>
                  <td className={styles.tableCell} data-label="Cargo">{employee.position ? employee.position.title : 'N/A'}</td>
                  <td className={styles.tableCell} data-label="Benefícios">{employee.benefits.length}</td>
                  <td className={`${styles.tableCell} ${styles.actionsCell}`} data-label="Ações">
                    <button onClick={() => handleEdit(employee)} className={`${styles.actionButton} ${styles.editButton}`}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(employee.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {employees.length === 0 && !loading && (
          <p className={styles.emptyState}>Nenhum funcionário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;