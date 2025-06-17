import React, { useState } from 'react';

const CreatePositionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          salary: Number(salary),
        }),
      });

      if (response.ok) {
        setMessage('Cargo cadastrado com sucesso!');
        setTitle('');
        setSalary('');
      } else {
        const error = await response.json();
        setMessage(`Erro: ${error.message}`);
      }
    } catch (err) {
      setMessage('Erro ao enviar dados para a API.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Cargo</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do cargo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salário:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CreatePositionForm;
