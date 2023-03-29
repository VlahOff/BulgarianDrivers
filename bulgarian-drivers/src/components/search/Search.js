import { useState } from 'react';
import { Link } from 'react-router-dom';

import { searchCarList } from '../../services/postsService';

import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import classes from './Search.module.css';

const Search = (props) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = await searchCarList(search);
    setResults(result);
    setSearch('');
  };

  return (
    <Card className={classes.card}>
      <form className={classes.form} onSubmit={onSubmit}>
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
          {results?.map((t) => {
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
    </Card>
  );
};

export default Search;
