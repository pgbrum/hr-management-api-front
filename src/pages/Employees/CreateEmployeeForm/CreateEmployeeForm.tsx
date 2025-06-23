import React, { useState, useEffect, useRef } from 'react';
import styles from './CreateEmployeeForm.module.css';
import { employeesService } from '../../../api/services/employeesService';
import { positionsService } from '../../../api/services/positionsService';
import { benefitsService } from '../../../api/services/benefitsService';
import { Position, Benefit } from '../../../types';

const CreateEmployeeForm: React.FC = () => {
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

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const allPositions = await positionsService.getAll();
        setPositions(allPositions);
        setFilteredPositions(allPositions);
      } catch (error) {
        console.error('Erro ao buscar cargos:', error);
      }
    };
    const fetchBenefits = async () => {
      try {
        const allBenefits = await benefitsService.getAll();
        setBenefits(allBenefits);
        setFilteredBenefits(allBenefits);
      } catch (error) {
        console.error('Erro ao buscar benefícios:', error);
      }
    };
    fetchPositions();
    fetchBenefits();
  }, []);

  useEffect(() => {
    const filtered = positions.filter(pos =>
      pos.title.toLowerCase().includes(positionInput.toLowerCase())
    );
    setFilteredPositions(filtered);
  }, [positionInput, positions]);

  useEffect(() => {
    const filtered = benefits.filter(ben =>
      ben.name.toLowerCase().includes(benefitInput.toLowerCase()) &&
      !selectedBenefits.some(sb => sb.id === ben.id)
    );
    setFilteredBenefits(filtered);
  }, [benefitInput, benefits, selectedBenefits]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (positionDropdownRef.current && !positionDropdownRef.current.contains(event.target as Node)) {
        setShowPositionDropdown(false);
      }
      if (benefitDropdownRef.current && !benefitDropdownRef.current.contains(event.target as Node)) {
        setShowBenefitDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

    try {
      await employeesService.create({
        name,
        email,
        positionId: positionId || null,
        benefits: selectedBenefits.map(b => b.id),
      });

      setSuccessMessage('Funcionário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPositionId(null);
      setPositionInput('');
      setSelectedBenefits([]);
      setBenefitInput('');
    } catch (error) {
      setErrorMessage('Erro ao cadastrar funcionário. Verifique os dados.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastrar Novo Funcionário</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Corporativo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Ex: joao.silva@empresa.com"
              required
            />
          </div>

          {/* Combobox de cargos */}
          <div className={`${styles.formGroup} ${styles.dropdownWrapper}`} ref={positionDropdownRef}>
            <label htmlFor="positionInput">Cargo</label>
            <input
              type="text"
              id="positionInput"
              value={positionInput}
              onChange={e => {
                setPositionInput(e.target.value);
                setPositionId(null);
                setShowPositionDropdown(true);
              }}
              placeholder="Digite para buscar cargo"
              autoComplete="off"
            />
            {showPositionDropdown && filteredPositions.length > 0 && (
              <ul className={styles.dropdownList}>
                {filteredPositions.map(pos => (
                  <li
                    key={pos.id}
                    onClick={() => handlePositionSelect(pos)}
                    onMouseDown={e => e.preventDefault()}
                    className={styles.dropdownItem}
                  >
                    {pos.title}
                  </li>
                ))}
              </ul>
            )}
            <small className={styles.formHint}>Campo opcional</small>
          </div>

          {/* Multi-select benefícios */}
          <div className={`${styles.formGroup} ${styles.dropdownWrapper}`} ref={benefitDropdownRef}>
            <label htmlFor="benefitInput">Benefícios</label>
            <input
              type="text"
              id="benefitInput"
              value={benefitInput}
              onChange={e => {
                setBenefitInput(e.target.value);
                setShowBenefitDropdown(true);
              }}
              placeholder="Digite para buscar benefícios"
              autoComplete="off"
            />
            {showBenefitDropdown && filteredBenefits.length > 0 && (
              <ul className={styles.dropdownList}>
                {filteredBenefits.map(benefit => (
                  <li
                    key={benefit.id}
                    onClick={() => handleAddBenefit(benefit)}
                    onMouseDown={e => e.preventDefault()}
                    className={styles.dropdownItem}
                  >
                    {benefit.name}
                  </li>
                ))}
              </ul>
            )}

            {/* Mostrar benefícios selecionados */}
            {selectedBenefits.length > 0 && (
              <div className={styles.selectedBenefits}>
                {selectedBenefits.map(b => (
                  <span key={b.id} className={styles.selectedBenefit}>
                    {b.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(b.id)}
                      aria-label={`Remover benefício ${b.name}`}
                      className={styles.removeBenefitButton}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <small className={styles.formHint}>Campo opcional. Clique para adicionar mais de um benefício.</small>
          </div>

          <button type="submit" className={styles.button}>
            Cadastrar Funcionário
          </button>

          {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
          {errorMessage && <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
