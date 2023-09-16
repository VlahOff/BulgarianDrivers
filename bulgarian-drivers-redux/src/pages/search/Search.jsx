import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import Input from '../../components/UI/input/Input';
import { searchCarList } from '../../store/posts-actions';

import classes from './Search.module.css';
import { postsActions } from '../../store/posts';

const Search = props => {
	const dispatch = useDispatch();
	const { searchResults, searchErrorMessage } = useSelector(
		state => state.posts
	);
	const [search, setSearch] = useState('');

	useEffect(() => {
		return () => dispatch(postsActions.setSearchResults([]));
	}, []);

	const onChangeHandler = event => {
		setSearch(event.target.value);
	};

	const onSubmit = async event => {
		event.preventDefault();

		if (!search.trim() == '') {
			dispatch(searchCarList(search));
		}
		setSearch('');
	};

	return (
		<Card className={classes.card}>
			<form
				className={classes.form}
				onSubmit={onSubmit}
			>
				<Input
					className={classes.input}
					input={{
						id: 'search',
						type: 'text',
						onChange: onChangeHandler,
						value: search,
					}}
				/>
				<Button type="submit">Search</Button>
			</form>
			{searchResults.length !== 0 && (
				<ul className={classes.results}>
					{searchResults?.map(t => {
						return (
							<Link
								to={`/drivers/${t._id}`}
								key={t._id}
								className={classes['result-link']}
							>
								<li className={classes.result}>{t.carNumber}</li>
							</Link>
						);
					})}
				</ul>
			)}
			{searchErrorMessage && (
				<p className={classes['error-message']}>{searchErrorMessage}</p>
			)}
		</Card>
	);
};

export default Search;
