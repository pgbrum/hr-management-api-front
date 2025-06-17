import React, { useEffect, useState } from 'react';

// URL base da sua API para benefícios
const API_BASE_URL = 'http://localhost:3333/benefits'; // Rota para benefícios

type Benefit = {
  id: string;
  name: string;
  value: number;
};

const BenefitsList: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Para erros

  // Função para buscar benefícios
  const fetchBenefits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      setBenefits(data.benefits);
    } catch (err) {
      console.error('Erro ao buscar benefícios:', err);
      setError('Falha ao carregar benefícios.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os benefícios ao montar o componente
  useEffect(() => {
    fetchBenefits();
  }, []);

  // Função para deletar um benefício
  const handleDelete = async (id: string) => {
    if (!window.confirm(`Tem certeza que deseja DELETAR o benefício com ID ${id}?`)) {
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
      // Se a deleção for bem-sucedida, recarrega a lista de benefícios
      await fetchBenefits();
      console.log(`Benefício ${id} deletado com sucesso.`);
    } catch (err) {
      console.error('Erro ao deletar benefício:', err);
      setError(`Falha ao deletar benefício ${id}.`);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar um benefício
  const handleEdit = async (benefit: Benefit) => {
    // Para simplificar, vamos usar prompt para pegar os novos dados
    const newName = prompt('Novo nome do benefício:', benefit.name);
    if (newName === null) return; // Usuário cancelou

    const newValueStr = prompt('Novo valor do benefício:', String(benefit.value));
    if (newValueStr === null) return; // Usuário cancelou

    const newValue = parseFloat(newValueStr); // Converte para número
    if (isNaN(newValue)) {
      alert('Valor inválido. Por favor, insira um número.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updatedBenefitData = {
        name: newName,
        value: newValue,
      };

      const response = await fetch(`${API_BASE_URL}/${benefit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBenefitData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Erro HTTP! Status: ${response.status} - ${errorBody}`);
      }

      // Se a edição for bem-sucedida, recarrega a lista de benefícios
      await fetchBenefits();
      console.log(`Benefício ${benefit.id} editado com sucesso.`);
    } catch (err) {
      console.error('Erro ao editar benefício:', err);
      setError(`Falha ao editar benefício ${benefit.id}: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando benefícios...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Benefícios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Benefício</th>
            <th>Valor</th>
            <th>Ações</th> {/* Nova coluna para os botões */}
          </tr>
        </thead>
        <tbody>
          {benefits.map((benefit) => (
            <tr key={benefit.id}>
              <td>{benefit.id}</td>
              <td>{benefit.name}</td>
              <td>{benefit.value}</td>
              <td>
                {/* Botão de Editar */}
                <button onClick={() => handleEdit(benefit)}>
                  Editar
                </button>
                {' '} {/* Espaço entre os botões */}
                {/* Botão de Deletar */}
                <button onClick={() => handleDelete(benefit.id)}>
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

export default BenefitsList;