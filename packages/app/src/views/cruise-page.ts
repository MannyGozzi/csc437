import { View } from "@calpoly/mustang";
import { html } from "lit";
import { Model } from "../model";
import { Msg } from "../messages";

export class CruisePage extends View<Model, Msg> {
  start: Date;
  end: Date;
  package: string;

  constructor() {
    super("blazing:model");
    this.start = new Date();
    this.end = new Date();
    this.package = "";
  }

  handleStart(event: { target: { value: Date } }) {
    this.start = new Date(event.target.value);
  }

  handleEnd(event: { target: { value: Date } }) {
    this.end = new Date(event.target.value);
  }

  handlePackage(event: { target: { value: string } }) {
    this.package = event.target.value;
  }

  onBook() {
    this.dispatchMessage([
      "cart/add",
      {
        item: `Cruise from ${this.start.toLocaleDateString()} to ${this.end.toLocaleDateString()} with ${this.package} package`,
      },
    ]);
  }

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
              <input
                type="date"
                name="start"
                id="start"
                @change=${this.handleStart}
              />
            </div>
            <div class="flex-col">
              <label>End</label>
              <input
                id="end"
                type="date"
                name="end"
                @change=${this.handleEnd}
              />
            </div>
          </div>
          <label>Package</label>
          <select name="package" @change=${this.handlePackage}>
            <option value="Drink">Unlimited Drinks</option>
            <option value="Food">Unlimited Food</option>
            <option value="Food/Drink">Premium (Food + Drink)</option>
          </select>
          <button @click=${this.onBook}>Book</button>
        </div>
      </section>`;
  }
}
