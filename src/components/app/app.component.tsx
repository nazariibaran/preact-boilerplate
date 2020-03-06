import { FunctionalComponent,h } from "preact";
import { AppProps } from './app.props'
import * as styles from './app.scss';
import { AppContext } from "@hooks";


/**
 * Renders App
 */
const App: FunctionalComponent<AppProps> = ({ history, children }) => {
  return (
    <AppContext.Provider value={{ history }}>
      {children}
    </AppContext.Provider>
  );
};

export { App };
