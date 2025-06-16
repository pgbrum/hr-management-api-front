import React, { useEffect, useState } from 'react';

type Benefit = {
  id: string;
  name: string;
  value: number;
};

const BenefitsList: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch('http://localhost:3333/benefits');
        const data = await response.json();
        setBenefits(data.benefits); // <- Aqui está o ajuste principal
      } catch (error) {
        console.error('Erro ao buscar benefício:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return <p>Carregando benefícios...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Benefício</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {benefits.map((benefit) => (
          <tr key={benefit.id}>
            <td>{benefit.id}</td>
            <td>{benefit.name}</td>
            <td>{benefit.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BenefitsList;
