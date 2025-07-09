import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

type HeaderProps = {
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLogout, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/" end onClick={handleLinkClick}>
            <span>RH</span>Master
          </NavLink>
        </div>

        {/* Controles que só aparecem em Desktop */}
        <div className={styles.desktopControls}>
          <nav>
            <ul className={styles.navList}>
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
              <li className={styles.navItem}>
                <button onClick={onLogout} className={`${styles.navLink} ${styles.logoutButton}`}>
                  Sair
                </button>
              </li>
            </ul>
          </nav>
          <button onClick={toggleTheme} className={styles.themeToggleButton}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Botão Hambúrguer que só aparece no Mobile */}
        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div />
          <div />
          <div />
        </button>
        
        {/* Painel do Menu Mobile (separado) */}
        <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.mobileNavList}>
            <li className={styles.navItem}>
              <NavLink to="/employees" end onClick={handleLinkClick} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Funcionários
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/positions" end onClick={handleLinkClick} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Cargos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/benefits" end onClick={handleLinkClick} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Benefícios
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/employees/create" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Funcionário
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/positions/create" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Cargo
              </NavLink>  
            </li>
            <li className={styles.navItem}>
              <NavLink to="/benefits/create" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Criar Benefício
              </NavLink>
            </li>
            <li className={`${styles.navItem} ${styles.mobileActions}`}>
              <button onClick={toggleTheme} className={styles.navLink}>
                Mudar para {theme === 'light' ? 'Dark' : 'Light'}
              </button>
              <button onClick={() => { onLogout(); handleLinkClick(); }} className={`${styles.navLink} ${styles.logoutButton}`}>
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