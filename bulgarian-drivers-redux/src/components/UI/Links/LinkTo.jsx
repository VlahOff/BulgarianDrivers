import { Link } from 'react-router-dom';
import classes from './LinkTo.module.css';

const LinkTo = props => {
	const styles = `${classes.link} ${props.className}`;

	return (
		<>
			<Link
				to={props.to}
				relative={props.relative || 'route'}
				className={styles}
			>
				{props.children}
			</Link>
		</>
	);
};

export default LinkTo;
