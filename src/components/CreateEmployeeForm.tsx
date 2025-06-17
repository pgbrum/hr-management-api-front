import React, { useState } from 'react';

const CreateEmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [positionId, setPositionId] = useState(''); // pode ficar vazio
  const [benefits, setBenefits] = useState(''); // string com IDs separados por vírgula

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparar array de benefits a partir da string separada por vírgula
    const benefitsArray = benefits
      .split(',')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    try {
      const response = await fetch('http://localhost:3333/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          positionId: positionId || null, // enviar null se vazio
          benefits: benefitsArray.length > 0 ? benefitsArray : undefined, // opcional
        }),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('Erro ao cadastrar funcionário');
      }

      setSuccessMessage('Funcionário cadastrado com sucesso!');
      setErrorMessage('');
      setName('');
      setEmail('');
      setPositionId('');
      setBenefits('');
    } catch (error) {
      setErrorMessage('Erro ao cadastrar funcionário.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Cadastrar Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="positionId">ID do Cargo (positionId):</label>
          <input
            type="text"
            id="positionId"
            value={positionId}
            onChange={(e) => setPositionId(e.target.value)}
            placeholder="Ex: 1234-abcd"
          />
        </div>

        <div>
          <label htmlFor="benefits">IDs dos Benefícios (separados por vírgula):</label>
          <input
            type="text"
            id="benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="Ex: benefit1, benefit2"
          />
        </div>

        <button type="submit">Cadastrar</button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
