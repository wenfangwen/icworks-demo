import { withRouter, HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import connect from '@/connect/user';
import path from 'path';
import routes from '@/routerConfig';
const RouteItem = props => {
  const { redirect, path: routePath, component, key } = props;
  if (redirect) {
    return <Redirect exact key={key} from={routePath} to={redirect} />;
  }
  return <Route key={key} component={component} path={routePath} />;
};
@withRouter
@connect
class router extends Component {
  constructor(props) {
    super(props);
    const { isLogined } = this.props;
    console.log('context', this.context);
    console.log('props', props);
  }
  checkLogin = function(props) {
    const { isLogined } = props;
    let { pathname } = props.location;
    if (!isLogined && pathname !== '/user/login') {
      return props.history.push('/user/login');
    }
    if (isLogined && pathname === '/user/login') {
      return props.history.push('/');
    }
  };
  componentWillReceiveProps(nextProps) {
    this.checkLogin(nextProps);
  }
  componentWillMount() {
    this.checkLogin(this.props);
  }
  render() {
    return (
      <Switch>
        {routes.map((route, id) => {
          const { component: RouteComponent, children, ...others } = route;
          return (
            <Route
              key={id}
              {...others}
              component={props => {
                return children ? (
                  <RouteComponent key={id} {...props}>
                    <Switch>
                      {children.map((routeChild, idx) => {
                        const { redirect, path: childPath, component } = routeChild;
                        return RouteItem({
                          key: `${id}-${idx}`,
                          redirect,
                          path: childPath && path.join(route.path, childPath),
                          component
                        });
                      })}
                    </Switch>
                  </RouteComponent>
                ) : (
                  <div>
                    {RouteItem({
                      key: id,
                      ...props
                    })}
                  </div>
                );
              }}
            />
          );
        })}
      </Switch>
    );
  }
}
export default router;
