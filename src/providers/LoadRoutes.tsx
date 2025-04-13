import React from "react";
import { Route, Switch } from "react-router-dom";

export default function LoadRoutes(props: any) {
  const { routes } = props;
  
  return (
    <Switch>
      {routes.map((route: any, index: number) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
