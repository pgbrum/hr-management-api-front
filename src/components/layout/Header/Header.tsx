import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

// O Header agora espera receber 'theme' e 'toggleTheme'
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

        {/* Envolvemos a navegação e o botão de tema */}
        <div className={styles.navControls}>
          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
            <ul className={styles.navList}>
              {/* Seus links de navegação... */}
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
              <li className={styles.navItem}>
                <button onClick={() => { onLogout(); handleLinkClick(); }} className={`${styles.navLink} ${styles.logoutButton}`}>
                  Sair
                </button>
              </li>
              {/* Botão de tema para o menu mobile */}
              <li className={`${styles.navItem} ${styles.mobileThemeToggle}`}>
                <button onClick={toggleTheme} className={styles.navLink}>
                  Mudar para {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Botão de tema para desktop */}
          <button onClick={toggleTheme} className={styles.themeToggleButton}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

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
      </div>
    </header>
  );
};

export default Header;