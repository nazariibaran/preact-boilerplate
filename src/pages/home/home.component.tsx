import { h, FunctionalComponent } from 'preact';
import { HomeProps } from './home.props';
import * as styles from './home.scss';
import { Link } from 'react-router-dom';
import { Button } from '@components';

/**
 * Renders Home
 */
const Home: FunctionalComponent<HomeProps> = ({}) => (
  <div className={styles.home}>
    <div className={styles.homeTitle}>Home</div>
    <Button>
      <Link className={styles.link} to='/profile'>
        Go to "Profile"
      </Link>
    </Button>
  </div>
);

export { Home };
