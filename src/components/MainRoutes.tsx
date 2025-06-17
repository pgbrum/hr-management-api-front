import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import BenefitsList from './BenefitsList';
import CreateAdminForm from './CreateAdminForm';
import CreateBenefitForm from './CreateBenefitForm';
import CreateEmployeeForm from './CreateEmployeeForm';
import CreatePositionForm from './CreatePositionForm';
import EmployeeList from './EmployeeList';
import Login from './Login/Login';
import PositionsList from './PositionsList';

const MainRoutes: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/admins/create">Criar Admin</Link></li>
          <li><Link to="/employees/create">Criar Funcionário</Link></li>
          <li><Link to="/positions/create">Criar Cargo</Link></li>
          <li><Link to="/benefits/create">Criar Benefício</Link></li>
          <li><Link to="/employees">Lista de Funcionários</Link></li>
          <li><Link to="/positions">Lista de Cargos</Link></li>
          <li><Link to="/benefits">Lista de Benefícios</Link></li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admins/create" element={<CreateAdminForm />} />
        <Route path="/employees/create" element={<CreateEmployeeForm />} />
        <Route path="/positions/create" element={<CreatePositionForm />} />
        <Route path="/benefits/create" element={<CreateBenefitForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/positions" element={<PositionsList />} />
        <Route path="/benefits" element={<BenefitsList />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
