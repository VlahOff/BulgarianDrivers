import { createContext, useCallback, useContext, useState } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => { },
  stopLoading: () => { }
});

export const LoadingProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return <LoadingContext.Provider
    value={{
      isLoading,
      startLoading,
      stopLoading
    }}>
    {props.children}
  </LoadingContext.Provider>;
};

export default LoadingContext;

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  return [context.startLoading, context.stopLoading];
}; 