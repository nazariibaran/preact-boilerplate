import { createBrowserHistory } from 'history';
import { render, h } from 'preact';
import { App } from '@components';
import { Routes } from './routes';
import './styles/main.scss';

const history = createBrowserHistory();

render(
  <App history={history}>
    <Routes history={history} />
  </App>,
  document.getElementById('app')
);
