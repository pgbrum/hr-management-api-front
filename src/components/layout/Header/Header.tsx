import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

// 1. Definimos o tipo para as props que o Header agora recebe.
type HeaderProps = {
  onLogout: () => void;
};

// 2. O componente agora é um React.FC<HeaderProps> e recebe 'onLogout'.
const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/" end>
            <span>RH</span>Master
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {/* Links para as listagens */}
            <li className={styles.navItem}>
              <NavLink to="/employees" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Funcionários
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/positions" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Cargos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/benefits" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Benefícios
              </NavLink>
            </li>

            {/* Links de "create" (pode ser um dropdown no futuro) */}
            <li className={styles.navItem}>
              <NavLink to="/employees/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Funcionário
              </NavLink>
            </li>
            {/* Adicionei os outros links de criação que estavam no seu original */}
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
            {/* <li className={styles.navItem}>
              <NavLink to="/admins/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Admin
              </NavLink>
            </li> */}

            {/* 3. O link de Login foi substituído por um botão de Sair */}
            <li className={styles.navItem}>
              <button onClick={onLogout} className={`${styles.navLink} ${styles.logoutButton}`}>
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;