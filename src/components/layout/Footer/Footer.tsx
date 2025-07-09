import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          
          <div className={styles.footerSection}>
            <h3 className={styles.logo}><span>RH</span>Master</h3>
            <p className={styles.tagline}>
              Gerenciando talentos, impulsionando o futuro.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Listagem</h4>
            <ul className={styles.linkList}>
              <li><Link to="/employees">Funcionários</Link></li>
              <li><Link to="/positions">Cargos</Link></li>
              <li><Link to="/benefits">Benefícios</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Criação</h4>
            <ul className={styles.linkList}>
              <li><Link to="/employees/create">Novo Funcionário</Link></li>
              <li><Link to="/positions/create">Novo Cargo</Link></li>
              <li><Link to="/benefits/create">Novo Benefício</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Contato</h4>
            <ul className={styles.linkList}>
              <li><a href="mailto:contato@rhmaster.com">contato@rhmaster.com</a></li>
              <li><p>+55 (11) 99999-9999</p></li>
            </ul>
          </div>

          <div className={`${styles.footerSection} ${styles.mapSection}`}>
            <h4 className={styles.sectionTitle}>Localização</h4>
            <div className={styles.mapWrapper}>
              <iframe
                // A correção está aqui
                title="Localização do escritório RHMaster"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.145881358509!2d-46.65883102377395!3d-23.56322926157071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1720545000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p className={styles.text}>
            © {currentYear} RHMaster. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;