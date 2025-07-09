import React, { useState, useEffect, useRef } from 'react';
import styles from './EmployeeForm.module.css';
import { employeesService } from '../../../api/services/employeesService';
import { positionsService } from '../../../api/services/positionsService';
import { benefitsService } from '../../../api/services/benefitsService';
import { Position, Benefit, Employee } from '../../../types';

type EmployeeFormProps = {
  employeeToEdit: Employee | null;
  onClose: () => void;
  onFormSubmit: () => void;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeToEdit, onClose, onFormSubmit }) => {
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

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const positionDropdownRef = useRef<HTMLDivElement>(null);
  const benefitDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Efeito para buscar todos os cargos e benefícios uma única vez
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
        console.error('Erro ao buscar dados:', error);
        setErrorMessage('Falha ao carregar dados para o formulário.');
      }
    };
    fetchAllData();
  }, []);

  // Efeito para preencher o formulário quando um funcionário é passado para edição
  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      
      if (employeeToEdit.position) {
        setPositionId(employeeToEdit.position.id);
        setPositionInput(employeeToEdit.position.title);
      } else {
        setPositionId(null);
        setPositionInput('');
      }

      // --- AQUI ESTÁ A CORREÇÃO PRINCIPAL ---
      // Se temos a lista de todos os benefícios e o funcionário tem IDs de benefícios...
      if (employeeToEdit.benefitIds && benefits.length > 0) {
        // ...filtramos a lista completa para encontrar os objetos que correspondem aos IDs.
        const currentBenefits = benefits.filter(benefit =>
          employeeToEdit.benefitIds.includes(benefit.id)
        );
        setSelectedBenefits(currentBenefits);
      } else {
        setSelectedBenefits([]);
      }
    } else {
      // Limpa o formulário se estiver em modo de criação
      setName('');
      setEmail('');
      setPositionId(null);
      setPositionInput('');
      setSelectedBenefits([]);
    }
    // Este efeito depende tanto do funcionário a ser editado quanto da lista de benefícios ter carregado
  }, [employeeToEdit, benefits]);

  // Efeitos para filtrar as listas de busca
  useEffect(() => {
    setFilteredPositions(positions.filter(pos => pos.title.toLowerCase().includes(positionInput.toLowerCase())));
  }, [positionInput, positions]);

  useEffect(() => {
    setFilteredBenefits(benefits.filter(ben => 
      ben.name.toLowerCase().includes(benefitInput.toLowerCase()) && 
      !selectedBenefits.some(sb => sb.id === ben.id)
    ));
  }, [benefitInput, benefits, selectedBenefits]);

  // Efeito para fechar o modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

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
      setTimeout(() => {
        onFormSubmit();
        onClose();
      }, 1500);
    } catch (error) {
      setErrorMessage('Erro ao salvar funcionário. Verifique os dados.');
      console.error(error);
    }
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard} ref={modalRef}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <h2 className={styles.title}>
          {employeeToEdit ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Corporativo</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
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
                    <button type="button" onClick={() => handleRemoveBenefit(b.id)} className={styles.removeItemButton}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <button type="submit" className={styles.button}>
            Salvar
          </button>

          {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
          {errorMessage && <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;