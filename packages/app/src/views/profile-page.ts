import { html, LitElement } from "lit";

export class ProfilePage extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <div class="center">
        <div class="container">
          <div class="flex-row">
            <a href="../"><button>←</button></a>
            <h2>Profile View</h2>
          </div>
          <section>
            <tour-view tourid="new place" />
          </section>
        </div>
      </div>`;
  }
}
