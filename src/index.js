import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';


<<<<<<< HEAD
import "./vendor/css/skeleton_css/normalize.css";
import "./vendor/css/skeleton_css/skeleton.css";
import "./styles/style.css";
=======
import "./styles/style.css";
// import "./vendor/css/skeleton_css/normalize.css";
// import "./vendor/css/skeleton_css/skeleton.css";
>>>>>>> b09a3ba2a1bd11e09e7c5a5a5a638e79bd55584f



import Main from './components/Main/Main';
import Login from './components/login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NewUser from './components/NewUser/NewUser';


ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/new" component={NewUser} />
  </Router>,
  document.getElementById('app'));
