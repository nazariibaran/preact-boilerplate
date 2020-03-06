import { FunctionalComponent, h } from 'preact';
import { PagesProps } from './pages.props';
import * as styles from './pages.scss';

/**
 * Renders Pages
 */
const Pages: FunctionalComponent<PagesProps> = ({}) => (
  <div className={styles.pages} />
);

export { Pages };
