import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { History } from 'history';

const AppContext = createContext<{ history: History }>({
  history: null
});

const useAppState = () => {
  return useContext(AppContext);
};

export { AppContext, useAppState };
