import { define, Auth, Store } from "@calpoly/mustang";
import { TravelHeader } from "./components/TravelHeader";
import { Model, init } from "./model";
import { Msg } from "./messages";
import update from "./update";
import { TourViewElement } from "./views/tour-view";
import { LoginForm } from "./components/LoginForm";

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "travel-header": TravelHeader,
  "tour-view": TourViewElement,
  "login-form": LoginForm 
});