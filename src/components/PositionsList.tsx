import React, { useEffect, useState } from 'react';

// URL base da sua API para cargos
const API_BASE_URL = 'http://localhost:3333/positions'; // Rota para cargos

type Position = {
  id: string;
  title: string;
  salary: number;
};

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Para erros

  // Função para buscar cargos
  const fetchPositions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      setPositions(data.positions); // <- Mantido o ajuste principal que você já tinha
    } catch (err) {
      console.error('Erro ao buscar cargos:', err);
      setError('Falha ao carregar cargos.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os cargos ao montar o componente
  useEffect(() => {
    fetchPositions();
  }, []);

  // Função para deletar um cargo
  const handleDelete = async (id: string) => {
    if (!window.confirm(`Tem certeza que deseja DELETAR o cargo com ID ${id}?`)) {
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
      // Se a deleção for bem-sucedida, recarrega a lista de cargos
      await fetchPositions();
      console.log(`Cargo ${id} deletado com sucesso.`);
    } catch (err) {
      console.error('Erro ao deletar cargo:', err);
      setError(`Falha ao deletar cargo ${id}.`);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar um cargo
  const handleEdit = async (position: Position) => {
    // Para simplificar, vamos usar prompt para pegar os novos dados
    const newTitle = prompt('Novo nome do cargo:', position.title);
    if (newTitle === null) return; // Usuário cancelou

    const newSalaryStr = prompt('Novo salário:', String(position.salary));
    if (newSalaryStr === null) return; // Usuário cancelou

    const newSalary = parseFloat(newSalaryStr); // Converte para número
    if (isNaN(newSalary)) {
      alert('Salário inválido. Por favor, insira um número.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updatedPositionData = {
        title: newTitle,
        salary: newSalary,
      };

      const response = await fetch(`${API_BASE_URL}/${position.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPositionData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Erro HTTP! Status: ${response.status} - ${errorBody}`);
      }

      // Se a edição for bem-sucedida, recarrega a lista de cargos
      await fetchPositions();
      console.log(`Cargo ${position.id} editado com sucesso.`);
    } catch (err) {
      console.error('Erro ao editar cargo:', err);
      setError(`Falha ao editar cargo ${position.id}: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando cargos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Cargos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Cargo</th>
            <th>Salário</th>
            <th>Ações</th> {/* Nova coluna para os botões */}
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td>{position.id}</td>
              <td>{position.title}</td>
              <td>{position.salary}</td>
              <td>
                {/* Botão de Editar */}
                <button onClick={() => handleEdit(position)}>
                  Editar
                </button>
                {' '} {/* Espaço entre os botões */}
                {/* Botão de Deletar */}
                <button onClick={() => handleDelete(position.id)}>
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

export default PositionList;