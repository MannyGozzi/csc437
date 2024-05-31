import { html, LitElement } from "lit";

export class HotelPage extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <section class="center">
        <div class="container">
          <div class="flex-row">
            <a href="../"><button>←</button></a>
            <h2>Hotels</h2>
          </div>
          <div class="flex-row">
            <div class="flex-col">
              <label for="startDate">Start Date</label>
              <input type="date" name="Start Date" id="startDate" />
            </div>
            <div class="flex-col">
              <label for="endDate">End Date</label>
              <input type="date" name="End Date" id="endDate" />
            </div>
          </div>
          <label>Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
          />
        </div>
      </section>`;
  }
}
