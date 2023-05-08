import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { onLogout } from '../../store/auth-actions';
import Hamburger from 'hamburger-react';
import Button from '../UI/Button/Button';
import NavLinkTo from '../UI/Links/NavLinkTo';

import logo from '../../assets/bg-drivers-logo-white.png';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => {
    setIsMenuOpen((s) => !s);
  };

  const onSelect = () => {
    setIsMenuOpen(false);
  };

  const onLogoutHandler = () => {
    dispatch(onLogout(navigate));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles['logo-container']}>
          <Link to="/">
            <img
              src={logo}
              alt="Bulgarian Drivers logo"
              className={styles.logo}
            />
          </Link>
        </div>

        <ul
          className={`${styles.links} ${isMenuOpen ? styles.menu : ''}`}
          onClick={onSelect}
        >
          <li>
            <NavLinkTo to="/">Home</NavLinkTo>
          </li>
          <li>
            <NavLinkTo to="/drivers" className={styles.link}>
              Drivers
            </NavLinkTo>
          </li>
          {!user ? (
            <>
              <li>
                <NavLinkTo to="/login" className={styles.link}>
                  Log In
                </NavLinkTo>
              </li>
              <li>
                <NavLinkTo to="/register" className={styles.link}>
                  Register
                </NavLinkTo>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLinkTo to="/profile" className={styles.link}>
                  <span>{user.username}</span>{' '}
                  <i className="fa-regular fa-user"></i>
                </NavLinkTo>
              </li>
              <li>
                <Button onClick={onLogoutHandler}>Logout</Button>
              </li>
            </>
          )}
          <li>
            <NavLinkTo to="/search" className={styles.link}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </NavLinkTo>
          </li>
        </ul>
        <div className={styles['menu-btn']} onClick={onMenuOpen}>
          <Hamburger color="#fff" toggled={isMenuOpen} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
