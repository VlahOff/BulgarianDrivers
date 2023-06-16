import { transformDate } from '../../utils/dateTransformer';
import classes from './Driver.module.css';

const Driver = props => {
	const date = transformDate(props.updatedOn);

	return (
		<li className={classes.post}>
			<p className={classes.number}>{props.carNumber}</p>
			<div className={classes['details-wrapper']}>
				<p>Comments: {props.comments}</p>
				<p>
					Latest comment: {date} <i className="fa-regular fa-clock"></i>
				</p>
			</div>
		</li>
	);
};

export default Driver;
