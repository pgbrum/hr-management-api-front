import React, { useEffect, useState } from 'react';

type Position = {
  id: string;
  title: string;
  salary: number;
};

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('http://localhost:3333/positions');
        const data = await response.json();
        setPositions(data.positions); // <- Aqui está o ajuste principal
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return <p>Carregando cargos...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do cargo</th>
          <th>Salário</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position.id}>
            <td>{position.id}</td>
            <td>{position.title}</td>
            <td>{position.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PositionList;
