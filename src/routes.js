import Route from "route-parser";
import LobbyPage from "components/LobbyPage";

export default [
  [":foo", LobbyPage]
].map(([routeString, RouteComponent]) => [new Route(routeString), RouteComponent]);
