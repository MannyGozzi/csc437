import { define, Auth, Store, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { TravelHeader } from "./components/TravelHeader";
import { Model, init } from "./model";
import { Msg } from "./messages";
import update from "./update";
import { TourViewElement } from "./views/tour-view";
import { LoginForm } from "./components/LoginForm";
import { HomeElement } from "./views/home-view";
import { LoginPage } from "./views/login-page";
import { RegisterPage } from "./views/register-page";
import { FlightPage } from "./views/flight-page";
import { HotelPage } from "./views/hotel-page";
import { CarPage } from "./views/car-page";
import { CruisePage } from "./views/cruise-page";
import { NewDestinationPage } from "./views/new-destination-page";
import { ViewPage } from "./views/view-page";
import { ItemsList } from "./components/ItemsList";
import { RegisterForm } from "./components/RegisterForm";
import { AllToursElement } from "./views/all-tours";

const routes = [
  {
    path: "/app/tour/:tourid",
    view: (params: Switch.Params) => html`
      <tour-view tourid=${params.tourid} .edit=${true}></tour-view>
    `,
  },
  {
    path: "/app",
    view: () => html` <home-view></home-view> `,
  },
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/app/login",
    view: () => html` <login-page></login-page> `,
  },
  {
    path: "/app/register",
    view: () => html` <register-page></register-page> `,
  },
  {
    path: "/app/flight",
    view: () => html` <flight-page></flight-page> `,
  },
  {
    path: "/app/hotel",
    view: () => html` <hotel-page></hotel-page>`,
  },
  {
    path: "/app/car",
    view: () => html` <car-page></car-page>`,
  },
  {
    path: "/app/cruise",
    view: () => html` <cruise-page></cruise-page>`,
  },
  {
    path: "/app/new-destination",
    view: () => html` <new-destination-page></new-destination-page>`,
  },
  {
    path: "/app/view/:tourid",
    view: (params: Switch.Params) => html`
    <view-page tourid=${params.tourid}></view-page>
  `,
  },
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
  "travel-header": TravelHeader,
  "tour-view": TourViewElement,
  "login-form": LoginForm,
  "home-view": HomeElement,
  "login-page": LoginPage,
  "register-page": RegisterPage,
  "flight-page": FlightPage,
  "hotel-page": HotelPage,
  "car-page": CarPage,
  "cruise-page": CruisePage,
  "new-destination-page": NewDestinationPage,
  "view-page": ViewPage,
  "items-list": ItemsList,
  "register-form": RegisterForm,
  "all-tours": AllToursElement
});
