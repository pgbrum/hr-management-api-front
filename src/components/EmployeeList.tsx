import React, { useEffect, useState } from 'react';

type Employee = {
  id: string;
  name: string;
  email: string; 
  position: string | null;
  benefits: string[];
};

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3333/employees');
        const data = await response.json();
        setEmployees(data.employees); // <- Aqui está o ajuste principal
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Carregando funcionários...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Benefícios</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.position ?? 'Sem cargo'}</td>
            <td>{employee.benefits.length ? employee.benefits.join(', ') : 'Nenhum'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
