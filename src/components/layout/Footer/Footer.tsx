// src/components/layout/Footer/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  // Pega o ano atual dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {currentYear} RHMaster. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;