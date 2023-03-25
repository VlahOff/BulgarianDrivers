import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';
import LinkTo from '../UI/LinkTo';
import Button from '../UI/Button';

import logo from '../../assets/bg-drivers-logo-white.png';
import styles from './Header.module.css';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles['logo-container']}>
          <Link to="/">
            <img src={logo} alt="Bulgarian Drivers logo" className={styles.logo} />
          </Link>
        </div>
        <ul className={styles.links}>
          <li><LinkTo to="/" className={styles.link}>Home</LinkTo></li>
          <li><LinkTo to="/drivers" className={styles.link}>Drivers</LinkTo></li>
          {!authCtx.user ?
            <>
              <li><LinkTo to="/login" className={styles.link}>Log In</LinkTo></li>
              <li><LinkTo to="/register" className={styles.link}>Register</LinkTo></li>
            </>
            :
            <>
              <li><LinkTo to="/profile" className={styles.link}>{authCtx.user.username} <i className="fa-regular fa-user"></i></LinkTo></li>
              <li><Button onClick={authCtx.onLogout}>Logout</Button></li>
            </>
          }
          <li><LinkTo to="/search" className={styles.link}><i className="fa-solid fa-magnifying-glass"></i></LinkTo></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;