import { html, LitElement } from "lit";

export class CarPage extends LitElement {
    render() {
        return html`
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/tokens.css" />
        <section class="center">
      <div class="container">
        <div class="flex-row">
          <a href="../"><button>←</button></a>
          <h2>Cars</h2>
          <p class="alert">
            All cars must be returned by 24:00 on the day of return
          </p>
        </div>
        <label>Car</label>
        <select name="package">
          <option>Toyota Corolla</option>
          <option>Tesla Model 3</option>
          <option>Toyota Camry</option>
        </select>
        <div class="flex-row">
          <div class="flex-col">
            <label>Pickup</label>
            <input id="pickup" type="date" name="pickup" />
          </div>
          <div class="flex-col">
            <label>Return Date</label>
            <input id="return" type="date" name="return" />
          </div>
        </div>
      </div>
    </section>`
    }
}