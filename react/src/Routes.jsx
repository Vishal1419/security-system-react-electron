import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Users from './scenes/Users';
import Licenses from './scenes/Licenses';

const Routes = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/licenses/:type?" render={props => <Licenses key={props.match.params.type || 'empty'} /> } />
      </Switch>
      <ToastContainer position="top-right" className="toastify" />
    </div>
  </HashRouter>
);

export default Routes;
