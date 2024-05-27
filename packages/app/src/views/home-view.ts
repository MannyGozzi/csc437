import { html, LitElement } from "lit";

export class HomeElement extends LitElement {
    render() {
        return html`
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/tokens.css" />
        <div class="center">
        <div class="container">
          <h2>Home</h2>
          <tour-view></tour-view>
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
            <a href="/app/profile">
              <h3>View Profile</h3>
            </a>
          </section>
          <section>
            <h2>Quick Destinations</h2>
            <article class="destination"></article>
          </section>
          <section></section>
        </div>
      </div>`
    }
}