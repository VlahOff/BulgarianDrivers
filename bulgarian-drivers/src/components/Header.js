import logo from '../assets/bg-drivers-logo-white.png';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles['logo-container']}>
          <a href="/">
            <img src={logo} alt="Bulgarian Drivers logo" className={styles.logo} />
          </a>
        </div>
        <ul className={styles.links}>
          <li><a href="/" className={styles.link}>Home</a></li>
          <li><a href="/" className={styles.link}>Posts</a></li>
          <li><a href="/" className={styles.link}>Log In</a></li>
          <li><a href="/" className={styles.link}>Register</a></li>
          <li><a href="/" className={styles.link}><i className="fa-solid fa-magnifying-glass"></i></a></li>
          <li><a href="/" className={styles.link}>Profile <i className="fa-regular fa-user"></i></a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;