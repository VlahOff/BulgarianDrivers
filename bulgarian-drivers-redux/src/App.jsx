import { useSelector } from 'react-redux';

import RouterOutlet from './RouterOutlet';
import ErrorBanner from './components/UI/ErrorBanner/ErrorBanner';
import Loading from './components/UI/Loading/Loading';
import Header from './components/header/Header';

import classes from './App.module.css';

function App() {
  const isLoading = useSelector(state => state.ui.isLoading);
  const errorMessage = useSelector(state => state.ui.errorMessage);

  return (
    <>
      {isLoading && <Loading />}
      {errorMessage &&
        <div className={classes['error-wrapper']}>
          <ErrorBanner error={errorMessage} />
        </div>
      }
      <Header />
      <main>
        <RouterOutlet />
      </main>
    </>
  );
}

export default App;
