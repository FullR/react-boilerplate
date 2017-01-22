import {React, Component} from "component";
import {inject} from "mobx-react";

function resolveRouteComponent(routePairs, route) {
  for(let [routeTest, RouteComponent] of routePairs) {
    let params = routeTest.match(route);
    if(params) {
      return {RouteComponent, params};
    }
  }
  return {};
}

@inject("router")
export default class Router extends Component {
  render() {
    const {routes, router} = this.props;
    const {RouteComponent, params} = resolveRouteComponent(routeParserRoutes, router.route);
    if(!RouteComponent) return null;
    return (
      <RouteComponent {...params}/>
    );
  }
}
