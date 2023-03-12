import styles from './Footer.module.css';

import logo from '../../assets/bg-drivers-logo-white.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>&#169; Copyright 2023</p>
      <img src={logo} alt="Logo" className={styles.logo} />
    </footer>
  );
};

export default Footer;