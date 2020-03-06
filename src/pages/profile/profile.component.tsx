import { h, FunctionalComponent } from 'preact';
import { ProfileProps } from './profile.props';
import * as styles from './profile.scss';
import { Link } from 'react-router-dom';
import { Button } from '@components';

/**
 * Renders Profile
 */
const Profile: FunctionalComponent<ProfileProps> = ({}) => (
  <div className={styles.profile}>
    <div className={styles.profileTitle}>Profile</div>
    <Button>
      <Link className={styles.link} to='/'>
        Go to "Home"
      </Link>
    </Button>
  </div>
);

export { Profile };
