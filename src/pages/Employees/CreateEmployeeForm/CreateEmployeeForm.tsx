import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importe os hooks
import styles from './CreateEmployeeForm.module.css';
import { employeesService } from '../../../api/services/employeesService';
import { positionsService } from '../../../api/services/positionsService';
import { benefitsService } from '../../../api/services/benefitsService';
import { Position, Benefit, Employee } from '../../../types';

const CreateEmployeeForm: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegar programaticamente
  const location = useLocation(); // Hook para acessar o 'state' da navegação
  const employeeToEdit = location.state?.employeeToEdit as Employee | null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [positionId, setPositionId] = useState<string | null>(null);
  const [positionInput, setPositionInput] = useState('');
  const [positions, setPositions] = useState<Position[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);

  const [benefitInput, setBenefitInput] = useState('');
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [filteredBenefits, setFilteredBenefits] = useState<Benefit[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<Benefit[]>([]);
  const [showBenefitDropdown, setShowBenefitDropdown] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const positionDropdownRef = useRef<HTMLDivElement>(null);
  const benefitDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [allPositions, allBenefits] = await Promise.all([
          positionsService.getAll(),
          benefitsService.getAll(),
        ]);
        setPositions(allPositions);
        setBenefits(allBenefits);
      } catch (error) {
        setErrorMessage('Falha ao carregar dados para o formulário.');
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      
      if (employeeToEdit.position) {
        setPositionId(employeeToEdit.position.id);
        setPositionInput(employeeToEdit.position.title);
      }
      
      if (employeeToEdit.benefitIds && benefits.length > 0) {
        const currentBenefits = benefits.filter(benefit =>
          employeeToEdit.benefitIds.includes(benefit.id)
        );
        setSelectedBenefits(currentBenefits);
      }
    }
  }, [employeeToEdit, benefits]);

  useEffect(() => {
    setFilteredPositions(positions.filter(pos => pos.title.toLowerCase().includes(positionInput.toLowerCase())));
  }, [positionInput, positions]);

  useEffect(() => {
    setFilteredBenefits(benefits.filter(ben => 
      ben.name.toLowerCase().includes(benefitInput.toLowerCase()) && 
      !selectedBenefits.some(sb => sb.id === ben.id)
    ));
  }, [benefitInput, benefits, selectedBenefits]);

  const handlePositionSelect = (pos: Position) => {
    setPositionId(pos.id);
    setPositionInput(pos.title);
    setShowPositionDropdown(false);
  };

  const handleAddBenefit = (benefit: Benefit) => {
    setSelectedBenefits(prev => [...prev, benefit]);
    setBenefitInput('');
    setShowBenefitDropdown(false);
  };

  const handleRemoveBenefit = (id: string) => {
    setSelectedBenefits(prev => prev.filter(b => b.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    const payload = {
      name,
      email,
      positionId: positionId || null,
      benefitIds: selectedBenefits.map(b => b.id),
    };

    try {
      if (employeeToEdit) {
        await employeesService.update(employeeToEdit.id, payload);
        setSuccessMessage('Funcionário atualizado com sucesso!');
      } else {
        await employeesService.create(payload);
        setSuccessMessage('Funcionário cadastrado com sucesso!');
      }
      setTimeout(() => navigate('/employees'), 1500); // Volta para a lista após sucesso
    } catch (error) {
      setErrorMessage('Erro ao salvar funcionário. Verifique os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {employeeToEdit ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required disabled={isLoading} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Corporativo</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isLoading} />
          </div>
          
          <div className={`${styles.formGroup} ${styles.dropdownWrapper}`} ref={positionDropdownRef}>
            <label htmlFor="positionInput">Cargo</label>
            <input
              type="text"
              id="positionInput"
              value={positionInput}
              onChange={e => { setPositionInput(e.target.value); setPositionId(null); setShowPositionDropdown(true); }}
              placeholder="Digite para buscar cargo"
              autoComplete="off"
              disabled={isLoading}
            />
            {showPositionDropdown && filteredPositions.length > 0 && (
              <ul className={styles.dropdownList}>
                {filteredPositions.map(pos => (
                  <li key={pos.id} onClick={() => handlePositionSelect(pos)} className={styles.dropdownItem}>
                    {pos.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.dropdownWrapper}`} ref={benefitDropdownRef}>
            <label htmlFor="benefitInput">Benefícios</label>
            <input
              type="text"
              id="benefitInput"
              value={benefitInput}
              onChange={e => { setBenefitInput(e.target.value); setShowBenefitDropdown(true); }}
              placeholder="Digite para buscar e adicionar benefícios"
              autoComplete="off"
              disabled={isLoading}
            />
            {showBenefitDropdown && filteredBenefits.length > 0 && (
              <ul className={styles.dropdownList}>
                {filteredBenefits.map(ben => (
                  <li key={ben.id} onClick={() => handleAddBenefit(ben)} className={styles.dropdownItem}>
                    {ben.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedBenefits.length > 0 && (
              <div className={styles.selectedItems}>
                {selectedBenefits.map(b => (
                  <span key={b.id} className={styles.selectedItem}>
                    {b.name}
                    <button type="button" onClick={() => handleRemoveBenefit(b.id)} className={styles.removeItemButton} disabled={isLoading}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>

          {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
          {errorMessage && <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;