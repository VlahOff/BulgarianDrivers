import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PostsContext from '../../contexts/postsContext';
import Card from '../UI/Card/Card';
import LinkTo from '../UI/Links/LinkTo';
import Driver from './Driver';

import classes from './DriversList.module.css';

const DriversList = () => {
	const { carList, loadCarList } = useContext(PostsContext);

	useEffect(() => {
		loadCarList();
	}, [loadCarList]);

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
							<Driver
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
