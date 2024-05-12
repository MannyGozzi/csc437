import { prepareTemplate } from "./template.js";
import { relayEvent } from "./relay-event.js";
import "./restful-form.js";

export class NavbarElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <link rel="stylesheet" href="/styles/tokens.css" />
      <link rel="stylesheet" href="/styles/app.css" />
      <script type="module" src="/js/relay-event.js"></script>
      <script type="module" src="/js/dark-mode.js"></script>
      <nav>
        <div class="logo-container">
          <img id="logo" src="logo.png" alt="logo" />
          <h1>Travel</h1>
        </div>
        <div class="center">
          <div class="dropdown">
            <img
              class="dropdown-btn"
              id="burger-icon"
              src="/images/icons/menu.png"
            />
            <div class="dropdown-content">
              <a href="login.html">Login</a>
              <a href="flight.html">Flight</a>
              <a href="hotel.html">Hotel</a>
              <a href="car.html">Car</a>
              <a href="cruise.html">Cruise</a>
              <a href="newDestination.html">New Destination</a>
            </div>
          </div>
          <img
            onclick="relayEvent(
              event, 
              'dark-mode', 
              {checked: 'undefined'}
              )"
            src="images/icons/darkTheme.png"
            alt="Dark Theme"
            id="dark-theme-icon"
          />
        </div>
      </nav>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      NavbarElement.template.cloneNode(true)
    );
  }
}

customElements.define("nav-bar", NavbarElement);

