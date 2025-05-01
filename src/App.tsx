import React, { memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';
import ConnectionProvider from './providers/ConnectionProvider';
import MainMenuProvider from './providers/MainMenuProvider';
import dbIndexed from './dbIndexed';
import './App.scss';

function App() {
  dbIndexed();
  return (
    <AuthProvider>
      <ConnectionProvider>
        <MainMenuProvider>
          <Router>
            <Switch>
              {routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
            </Switch>
          </Router>
        </MainMenuProvider>
      </ConnectionProvider>
    </AuthProvider>
  );
}

export default memo(App);

function RouteWithSubRoutes(route: { path: string; exact: boolean; routes: {}; component: any }) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
