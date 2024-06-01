import { View } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class HotelPage extends View<Model, Msg> {
  start: Date;
  end: Date;
  location: string;

  constructor() {
    super("blazing:model");
    this.start = new Date();
    this.end = new Date();
    this.location = "";
  }

  handleStart(event: { target: { value: Date } }) {
    this.start = new Date(event.target.value);
  }

  handleEnd(event: { target: { value: Date } }) {
    this.end = new Date(event.target.value);
  }

  handleLocation(event: { target: { value: string } }) {
    this.location = event.target.value;
  }

  onBook() {
    this.dispatchMessage([
      "cart/add",
      {
        item: `Hotel from ${this.start.toLocaleDateString()} to ${this.end.toLocaleDateString()} in ${this.location}`,
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
            <h2>Hotels</h2>
          </div>
          <div class="flex-row">
            <div class="flex-col">
              <label for="startDate">Start Date</label>
              <input
                type="date"
                name="Start Date"
                id="startDate"
                @change=${this.handleStart}
              />
            </div>
            <div class="flex-col">
              <label for="endDate">End Date</label>
              <input
                type="date"
                name="End Date"
                id="endDate"
                @change=${this.handleEnd}
              />
            </div>
          </div>
          <label>Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            @change=${this.handleLocation}
          />
          <button @click=${this.onBook}>Book</button>
        </div>
      </section>`;
  }
}
