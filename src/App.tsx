import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/EmployeeList';
import PositionList from './components/PositionsList';
import BenefitsList from './components/BenefitsList';

function App() {
  return (
    <div>
      <EmployeeList />
      <PositionList />
      <BenefitsList/>
    </div>
  );
}

export default App;
