import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import MainContainer from '../../ui/containers/MainContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import SignIn from '../../ui/pages/SignIn.jsx';
import Join from '../../ui/pages/Join.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/" component={MainContainer}>
        <Route path="lists/:id" component={ListContainer} />
        <Route path="signin" component={SignIn} />
        <Route path="join" component={Join} />
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  </Router>
);
