import styles from './Header.module.css';

import logo from '../../assets/bg-drivers-logo-white.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

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
          <li><Link to="/" className={styles.link}>Home</Link></li>
          <li><Link to="/posts" className={styles.link}>Posts</Link></li>
          {!authCtx.user ?
            <>
              <li><Link to="/login" className={styles.link}>Log In</Link></li>
              <li><Link to="/register" className={styles.link}>Register</Link></li>
            </>
            :
            <>
              <li><Link to="/profile" className={styles.link}>{authCtx.user.username} <i className="fa-regular fa-user"></i></Link></li>
              <li><button className={styles.link} onClick={authCtx.onLogout}>Logout</button></li>
            </>
          }
          <li><Link to="/search" className={styles.link}><i className="fa-solid fa-magnifying-glass"></i></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;