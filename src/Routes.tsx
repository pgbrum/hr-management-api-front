// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe os componentes que serão usados nas rotas
import Login from './pages/Login/Login/Login';
import CreateAdminForm from './pages/Login/CreateAdminForm/CreateAdminForm';
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
      <Route path="/admins/create" element={<CreateAdminForm />} />
      <Route path="/employees/create" element={<CreateEmployeeForm />} />
      <Route path="/positions/create" element={<CreatePositionForm />} />
      <Route path="/benefits/create" element={<CreateBenefitForm />} />

      {/* Rotas para as páginas de listagem */}
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/positions" element={<PositionList />} />
      <Route path="/benefits" element={<BenefitsList />} />
      
      {/* Rota para Login e também a rota padrão/inicial */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}