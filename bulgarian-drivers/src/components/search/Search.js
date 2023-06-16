import { useState } from 'react';
import { Link } from 'react-router-dom';

import { searchCarList } from '../../services/postsService';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';

import classes from './Search.module.css';

const Search = props => {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');

	const onChangeHandler = event => {
		setSearch(event.target.value);
	};

	const onSubmit = async event => {
		event.preventDefault();
		setErrorMsg('');
		setResults([]);

		if (search.trim() === '') {
			setErrorMsg('Please enter car number.');
			return;
		}

		const result = await searchCarList(search);
		setResults(result);

		if (result.length === 0) {
			setErrorMsg('No posts found.');
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
			{results.length !== 0 && (
				<ul className={classes.results}>
					{results?.map(t => {
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
			{errorMsg && <p className={classes['error-message']}>{errorMsg}</p>}
		</Card>
	);
};

export default Search;
