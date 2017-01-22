import {observable, action} from "mobx";

export default class Router {
  @observable route;

  constructor({hasher}) {
    this.hasher = hasher;
    this.updateRoute = this.updateRoute.bind(this);
    hasher.changed.add(this.updateRoute);
    hasher.initialized.add(this.updateRoute);
    hasher.init();
  }

  @action updateRoute() {
    this.route = this.hasher.getHash();
  }
}
