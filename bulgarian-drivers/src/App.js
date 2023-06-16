import { useContext } from 'react';

import ErrorContext from './contexts/errorContext';
import LoadingContext from './contexts/loadingContext';
import RouterOutlet from './RouterOutlet';

import Header from './components/header/Header';
import ErrorBanner from './components/UI/ErrorBanner/ErrorBanner';
import Loading from './components/UI/Loading/Loading';

import classes from './App.module.css';

function App() {
	const errorCtx = useContext(ErrorContext);
	const loadingCtx = useContext(LoadingContext);

	return (
		<>
			{loadingCtx.isLoading && <Loading />}
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
