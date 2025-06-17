import React, { useEffect, useState } from 'react';

// URL base da sua API
const API_BASE_URL = 'http://localhost:3333/employees';

type Position = {
  id: string;
  title: string;
  salary: number;
};

type Employee = {
  id: string;
  name: string;
  email: string;
  position: Position | null;
  benefits: string[];
};

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Para erros, se ocorrerem

  // Função para buscar funcionários
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null); // Limpa qualquer erro anterior
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data.employees);
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err);
      setError('Falha ao carregar funcionários.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os funcionários ao montar o componente
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Função para deletar um funcionário
  const handleDelete = async (id: string) => {
    if (!window.confirm(`Tem certeza que deseja DELETAR o funcionário com ID ${id}?`)) {
      return; // Cancela se o usuário não confirmar
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      // Se a deleção for bem-sucedida, recarrega a lista de funcionários
      await fetchEmployees();
      console.log(`Funcionário ${id} deletado com sucesso.`);
    } catch (err) {
      console.error('Erro ao deletar funcionário:', err);
      setError(`Falha ao deletar funcionário ${id}.`);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar um funcionário
  const handleEdit = async (employee: Employee) => {
    // Para simplificar, vamos usar prompt para pegar os novos dados
    const newName = prompt('Novo nome:', employee.name);
    if (newName === null) return; // Usuário cancelou

    const newEmail = prompt('Novo email:', employee.email);
    if (newEmail === null) return; // Usuário cancelou

    const newPositionId = prompt('Novo ID do Cargo (deixe em branco se não houver ou não souber o ID):', employee.position?.id || '');
    if (newPositionId === null) return; // Usuário cancelou

    const newBenefitsStr = prompt('Novos benefícios (separados por vírgula):', employee.benefits.join(', '));
    if (newBenefitsStr === null) return; // Usuário cancelou

    setLoading(true);
    setError(null);
    try {
      const updatedEmployeeData = {
        name: newName,
        email: newEmail,
        positionId: newPositionId || null, // Se vazio, envia null
        benefits: newBenefitsStr.split(',').map(b => b.trim()).filter(b => b !== ''), // Divide e limpa
      };

      const response = await fetch(`${API_BASE_URL}/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData),
      });

      if (!response.ok) {
        const errorBody = await response.text(); // Tenta ler a resposta para mais detalhes
        throw new Error(`Erro HTTP! Status: ${response.status} - ${errorBody}`);
      }

      // Se a edição for bem-sucedida, recarrega a lista de funcionários
      await fetchEmployees();
      console.log(`Funcionário ${employee.id} editado com sucesso.`);
    } catch (err) {
      console.error('Erro ao editar funcionário:', err);
      setError(`Falha ao editar funcionário ${employee.id}: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando funcionários...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Funcionários</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Benefícios</th>
            <th>Ações</th> {/* Nova coluna para os botões */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position ? employee.position.title : 'Sem cargo'}</td>
              <td>{employee.benefits.length ? employee.benefits.join(', ') : 'Nenhum'}</td>
              <td>
                {/* Botão de Editar */}
                <button onClick={() => handleEdit(employee)}>
                  Editar
                </button>
                {' '} {/* Espaço entre os botões */}
                {/* Botão de Deletar */}
                <button onClick={() => handleDelete(employee.id)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;