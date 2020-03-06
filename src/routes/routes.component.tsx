import { FunctionalComponent, h } from 'preact';
import { Route, Router, Switch } from 'react-router-dom';
import { Home } from 'src/pages/home';
import { Profile } from 'src/pages/profile';
import { RoutesProps } from './routes.props';
import * as styles from './routes.scss';

/**
 * Renders Routes
 */
const Routes: FunctionalComponent<RoutesProps> = ({ history }) => (
  <div className={styles.routes}>
    <Router history={history}>
      <Switch>
        <Route path='/profile' render={() => <Profile />} />
        <Route path='/' render={() => <Home />} />
      </Switch>
    </Router>
  </div>
);

export { Routes };

