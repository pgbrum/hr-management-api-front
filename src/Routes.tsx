import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importe os componentes que serão usados nas rotas
// O Login NÃO é mais importado aqui.
import CreateEmployeeForm from './pages/Employees/CreateEmployeeForm/CreateEmployeeForm';
import CreatePositionForm from './pages/Positions/CreatePositionForm/CreatePositionForm';
import CreateBenefitForm from './pages/Benefits/CreateBenefitForm/CreateBenefitForm';
import EmployeeList from './pages/Employees/EmployeeList/EmployeeList';
import PositionList from './pages/Positions/PositionsList/PositionsList';
import BenefitsList from './pages/Benefits/BenefitsList/BenefitsList';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas para as páginas de criação */}
      <Route path="/employees/create" element={<CreateEmployeeForm />} />
      <Route path="/positions/create" element={<CreatePositionForm />} />
      <Route path="/benefits/create" element={<CreateBenefitForm />} />

      {/* Rotas para as páginas de listagem */}
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/positions" element={<PositionList />} />
      <Route path="/benefits" element={<BenefitsList />} />
      
      {/* 1. REMOVEMOS as rotas para /login e / daqui. */}

      {/* 2. Definimos uma rota padrão para onde o usuário será levado após o login. */}
      {/* A rota "/" agora redireciona para a lista de funcionários, por exemplo. */}
      <Route path="/" element={<Navigate to="/employees" />} />

    </Routes>
  );
}
