import { html, LitElement } from "lit";

export class HomeElement extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <div class="center">
        <div class="container">
          <h2>Home</h2>
          <items-list></items-list>
          <section class="services-grid">
            <a href="/app/flight">
              <h3>Flights</h3>
            </a>
            <a href="/app/hotel">
              <h3>Hotels</h3>
            </a>
            <a href="/app/car">
              <h3>Cars</h3>
            </a>
            <a href="/app/cruise">
              <h3>Cruises</h3>
            </a>
            <a href="/app/new-destination">
              <h3>New Destination</h3>
            </a>
          </section>
          <all-tours></all-tours>
          <section></section>
        </div>
      </div>`;
  }
}
