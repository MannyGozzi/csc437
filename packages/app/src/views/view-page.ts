import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class ViewPage extends LitElement {
  @property({ type: String, reflect: true})
  tourid = ""

  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <div class="center">
        <div class="container">
          <div class="flex-row">
            <a href="/app"><button>←</button></a>
            <h2>Destination</h2>
          </div>
          <section>
            <tour-view tourid=${this.tourid} />
          </section>
        </div>
      </div>`;
  }
}
