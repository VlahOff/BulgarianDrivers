import { NavLink } from 'react-router-dom';
import classes from './LinkTo.module.css';

const NavLinkTo = props => {
	return (
		<>
			<NavLink
				to={props.to}
				className={({ isActive }) => (isActive ? classes.active : classes.link)}
			>
				{props.children}
			</NavLink>
		</>
	);
};

export default NavLinkTo;
