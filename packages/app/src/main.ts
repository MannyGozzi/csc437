import { define, Auth, Store, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { TravelHeader } from "./components/TravelHeader";
import { Model, init } from "./model";
import { Msg } from "./messages";
import update from "./update";
import { TourViewElement } from "./views/tour-view";
import { LoginForm } from "./components/LoginForm";
import { HomeElement } from "./views/home-view";
import { RestfulFormElement } from "./views/restful-form";
import { LoginPage } from "./views/login-page";
import { RegisterPage } from "./views/register-page";
import { FlightPage } from "./views/flight-page";

const routes = [
  {
    path: "/app/tour/:tourid",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.tourid}></tour-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  },
  {
    path: "/app/login",
    view: () => html`
      <login-page></login-page>
    `
  },
  {
    path: "/app/register",
    view: () => html`
      <register-page></register-page>
    `
  },
  {
    path: "/app/flight",
    view: () => html`
      <flight-page></flight-page>
    `
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history");
    }
  },
  "restful-form": RestfulFormElement,
  "travel-header": TravelHeader,
  "tour-view": TourViewElement,
  "login-form": LoginForm ,
  "home-view": HomeElement,
  "login-page": LoginPage,
  "register-page": RegisterPage,
  "flight-page": FlightPage
});