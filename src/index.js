import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import "./styles/style.css";

import Main from './components/Main/Main';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
  </Router>,
  document.getElementById('app'));
