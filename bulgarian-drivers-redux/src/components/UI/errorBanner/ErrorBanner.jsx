import classes from './ErrorBanner.module.css';

const ErrorBanner = props => {
	return (
		<div className={classes.banner}>
			<p className={classes.message}>{props.error}</p>
		</div>
	);
};

export default ErrorBanner;
