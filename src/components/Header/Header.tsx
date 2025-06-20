// src/components/Header/Header.tsx
import React from 'react';
// Importamos NavLink em vez de Link
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* Usamos NavLink aqui para que o logo leve para a página inicial */}
          <NavLink to="/">
            <span>RH</span>Master
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              {/* Para cada link, usamos a função no className para aplicar a classe ativa */}
              <NavLink 
                to="/login" 
                className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
              >
                Login
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/admins/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Admin
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/employees/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Funcionário
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/positions/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Cargo
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/benefits/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Benefício
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/employees" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Funcionários
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/positions" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Cargos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/benefits" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Benefícios
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;