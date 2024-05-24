import { DropdownElement, Events, define } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import "../dark-mode";

function toggleDarkMode(ev: InputEvent) {
  Events.relay(ev, "dark-mode", {
  checked: undefined
})}

export class TravelHeader extends LitElement {
  static uses = define({
    "drop-down": DropdownElement
  });

  render() {
    return html`
      <nav>
        <div class="logo-container">
          <img id="logo" src="images/icons/logo.png" alt="logo" />
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
              <a
                href="#"
                onclick="relayEvent(event, 'auth:message', ['auth/signout'])"
              >
                Sign out
              </a>
            </div>
          </div>
          <img
            @click=${toggleDarkMode}
            src="images/icons/darkTheme.png"
            alt="Dark Theme"
            id="dark-theme-icon"
          />
        </div>
      </nav>
    `;
  }

  static styles = css`
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-fg);
      position: fixed;
      box-sizing: content-box;
      top: 0;
      width: 100vw;
    }

    nav a {
      color: var(--color-text);
      font-size: 1.5rem;
      text-decoration: none;
      padding: 0 1rem;
    }

    nav a:hover {
      color: var(--color-primary);
    }

    #logo {
      width: 5rem;
    }

    .logo-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: var(--color-text);
    }

    /* navbar =============================== */
    .dropdown {
      position: static;
    }

    .dropdown:hover .dropdown-content {
      display: block;
      width: fit-content;
    }

    .dropdown-btn {
      height: 3rem;
      width: 3rem;
      box-shadow: var(--shadow);
      border-radius: var(--rounded);
      background: white;
      padding: 0.2rem;
    }

    .dropdown-content {
      display: none;
      flex-direction: column;
      position: absolute;
      background-color: var(--color-fg);
      animation: slideIn 0.3s ease-in-out;
      gap: var(--padding-sm);
      border-radius: var(--rounded);
      overflow: hidden;
      min-width: 10rem;
      box-shadow: var(--shadow);
    }

    .dropdown-content a {
      padding: var(--padding-sm) var(--padding-lg);
      transition: all 0.2s ease-in-out;
    }

    .dropdown-content a:hover {
      background-color: var(--color-primary);
      color: var(--color-text-opp);
    }

    .dropdown:hover .dropdown-content {
      display: flex;
      transform: translateX(-50%);
    }

    @keyframes slideIn {
      0% {
        transform: translateY(-1rem);
        opacity: 0;
      }
      100% {
        transform: translateY(0), translateX(-50%);
        opacity: 1;
      }
    }

    #dark-theme-icon {
      width: 2rem;
      height: 2rem;
      background-color: white;
      padding: 0.1rem;
      margin: 0 2rem;
      border-radius: 100rem;
    }
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `;
}
