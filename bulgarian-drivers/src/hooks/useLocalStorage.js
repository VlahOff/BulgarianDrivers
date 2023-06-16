import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
	const [state, setState] = useState(() => {
		const userData = JSON.parse(localStorage.getItem(key));
		if (userData) {
			return userData;
		}

		return initialValue;
	});

	const setLocalStorageState = value => {
		setState(value);
		if (value === undefined) {
			localStorage.clear(key);
			return;
		}

		localStorage.setItem(key, JSON.stringify(value));
	};

	return [state, setLocalStorageState];
};
