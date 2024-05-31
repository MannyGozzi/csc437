import { Events } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import "../dark-mode";

function toggleDarkMode(ev: InputEvent) {
  Events.relay(ev, "dark-mode", {
    checked: undefined,
  });
}

export class TravelHeader extends LitElement {
  signOut(event: Event) {
    Events.relay(event, "auth:message", ["auth/signout"]);
  }

  render() {
    return html`
      <nav>
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/tokens.css" />
        <a href="/app"
          ><div class="logo-container">
            <img id="logo" src="/images/icons/logo.png" alt="logo" />
            <h1>Travel</h1>
          </div></a
        >
        <div class="center">
          <div class="dropdown">
            <img
              class="dropdown-btn"
              id="burger-icon"
              src="/images/icons/menu.png"
            />
            <div class="dropdown-content">
              <a href="/login.html?next=/app">Login</a>
              <a href="/app/flight">Flight</a>
              <a href="/app/hotel">Hotel</a>
              <a href="/app/car">Car</a>
              <a href="/app/cruise">Cruise</a>
              <a href="/app/new-destination">New Destination</a>
              <a href="#" @click=${this.signOut}> Sign out </a>
            </div>
          </div>
          <img
            @click=${toggleDarkMode}
            src="/images/icons/darkTheme.png"
            alt="Dark Theme"
            id="dark-theme-icon"
          />
        </div>
      </nav>
    `;
  }
}
