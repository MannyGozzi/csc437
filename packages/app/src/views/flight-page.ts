import { html, LitElement } from "lit";

export class FlightPage extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <section class="center">
        <div class="container">
          <div class="flex-row">
            <a href="../"><button>←</button></a>
            <h2>Flights</h2>
          </div>
          <label for="date">Date</label>
          <input type="date" name="date" id="date" />
          <div class="flex-row">
            <div class="flex-col">
              <label>Departure</label>
              <input
                id="departure"
                type="text"
                name="departure"
                placeholder="Location"
              />
            </div>
            <div class="flex-col">
              <label>Destination</label>
              <input
                id="destination"
                type="text"
                name="destination"
                placeholder="Location"
              />
            </div>
          </div>
        </div>
      </section>`;
  }
}
