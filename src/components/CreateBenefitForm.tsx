import React, { useState } from 'react';

const CreateBenefitForm: React.FC = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/benefits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar benefício');
      }

      setSuccessMessage('Benefício cadastrado com sucesso!');
      setErrorMessage('');
      setName('');
      setValue(0);
    } catch (error) {
      setErrorMessage('Erro ao cadastrar benefício.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Cadastrar Benefício</h2>
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
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateBenefitForm;
