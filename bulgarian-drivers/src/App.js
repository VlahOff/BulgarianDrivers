import Header from './components/header/Header';
import RouterOutlet from './RouterOutlet';

import classes from './App.module.css';
import { useContext } from 'react';
import ErrorBanner from './components/UI/ErrorBanner';
import ErrorContext from './contexts/errorContext';

function App() {
  const errorCtx = useContext(ErrorContext);

  return (
    <>
      <div className={classes['error-wrapper']}>
        {errorCtx.isOpen && <ErrorBanner error={errorCtx.message} />}
      </div>
      <Header />
      <main>
        <RouterOutlet />
      </main>
    </>
  );
}

export default App;
