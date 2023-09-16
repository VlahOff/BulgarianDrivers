import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../../components/UI/card/Card';
import LinkTo from '../../components/UI/links/LinkTo';
import DriverCard from '../../components/driverCard/DriverCard';
import { getCarList } from '../../store/posts-actions';

import classes from './DriversList.module.css';

const DriversList = () => {
	const dispatch = useDispatch();
	const carList = useSelector(state => state.posts.carList);

	useEffect(() => {
		dispatch(getCarList());
	}, [dispatch]);

	return (
		<Card className={classes.card}>
			<header className={classes.header}>
				<h2 className={classes.title}>Recent</h2>
				<LinkTo to="/create-post">Create a post</LinkTo>
			</header>
			<ul className={classes.posts}>
				{carList.map(p => {
					return (
						<Link
							key={p._id}
							to={`/drivers/${p._id}`}
							className={classes.link}
						>
							<DriverCard
								className={classes.post}
								carNumber={p.carNumber}
								updatedOn={p.updatedOn}
								comments={p.posts.length}
							/>
						</Link>
					);
				})}
			</ul>
		</Card>
	);
};

export default DriversList;
