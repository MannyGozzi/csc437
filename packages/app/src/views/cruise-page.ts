import { html, LitElement } from "lit";

export class CruisePage extends LitElement {
  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <section class="center">
        <div class="container">
          <div class="flex-row">
            <a href="../"><button>←</button></a>
            <h2>Cruises</h2>
          </div>
          <div class="flex-row">
            <div class="flex-col">
              <label for="date">Start</label>
              <input type="date" name="start" id="start" />
            </div>
            <div class="flex-col">
              <label>End</label>
              <input id="end" type="date" name="end" />
            </div>
          </div>
          <label>Package</label>
          <select name="package">
            <option value="Drink">Unlimited Drinks</option>
            <option value="Food">Unlimited Food</option>
            <option value="Food/Drink">Premium (Food + Drink)</option>
          </select>
        </div>
      </section>`;
  }
}
