import { h, FunctionalComponent } from 'preact';
import { ButtonProps } from './button.props';
import * as styles from './button.scss';
import classnames from 'classnames';

/**
 * Renders Button
 */
const Button: FunctionalComponent<ButtonProps> = ({ className, children }) => (
  <div className={classnames(className, styles.button)}>{children}</div>
);

export { Button };
