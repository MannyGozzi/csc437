import { html, LitElement } from "lit";

export class NewDestinationPage extends LitElement {
    render() {
        return html`
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/tokens.css" />
        <section class="center">
        <div class="container">
          <div class="flex-row">
            <a href="../"><button>←</button></a>
            <h2>New Destination</h2>
          </div>
          <div class="flex-row">
            <form-element />
          </div>
        </div>
      </section>`
    }
}