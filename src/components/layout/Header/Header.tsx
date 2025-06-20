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
          {/* Adicionamos 'end' para que o logo não fique ativo em todas as páginas */}
          <NavLink to="/" end>
            <span>RH</span>Master
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              {/* Adicionamos 'end' ao login para garantir correspondência exata */}
              <NavLink 
                to="/login"
                end 
                className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
              >
                Login
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* Links de "create" não precisam de 'end' pois já são específicos */}
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
              {/* CORREÇÃO PRINCIPAL: Adicionado 'end' ao link de listagem */}
              <NavLink to="/employees" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Funcionários
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* CORREÇÃO PRINCIPAL: Adicionado 'end' ao link de listagem */}
              <NavLink to="/positions" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Cargos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* CORREÇÃO PRINCIPAL: Adicionado 'end' ao link de listagem */}
              <NavLink to="/benefits" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
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