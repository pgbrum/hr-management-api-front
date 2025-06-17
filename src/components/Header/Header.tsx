// src/components/Header/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importa os estilos do módulo CSS

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Gestão de RH</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link to="/login" className={styles.navLink}>Login</Link></li>
            <li className={styles.navItem}><Link to="/admins/create" className={styles.navLink}>Criar Admin</Link></li>
            <li className={styles.navItem}><Link to="/employees/create" className={styles.navLink}>Criar Funcionário</Link></li>
            <li className={styles.navItem}><Link to="/positions/create" className={styles.navLink}>Criar Cargo</Link></li>
            <li className={styles.navItem}><Link to="/benefits/create" className={styles.navLink}>Criar Benefício</Link></li>
            <li className={styles.navItem}><Link to="/employees" className={styles.navLink}>Lista de Funcionários</Link></li>
            <li className={styles.navItem}><Link to="/positions" className={styles.navLink}>Lista de Cargos</Link></li>
            <li className={styles.navItem}><Link to="/benefits" className={styles.navLink}>Lista de Benefícios</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;