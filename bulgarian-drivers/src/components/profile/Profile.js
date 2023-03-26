import { useContext } from 'react';
import { ErrorContext } from '../../contexts/errorContext';
import Button from '../UI/Button';
import classes from './Profile.module.css';

const Profile = (props) => {
  const { toggle } = useContext(ErrorContext);

  return (
    <div className={classes.main}>
      <h1>Profile</h1>
      <Button onClick={toggle}>Test</Button>
    </div>
  );
};

export default Profile;