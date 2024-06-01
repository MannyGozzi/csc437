import { View } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { Model } from "../model";
import { Msg } from "../messages";

export class FlightPage extends View<Model, Msg> {
  date: Date;
  departure: string;
  destination: string;

  constructor() {
    super("blazing:model");
    this.date = new Date();
    this.departure = "";
    this.destination = "";
  }

  handleDateChange(event: { target: { value: Date } }) {
    this.date = new Date(event.target.value);
  }

  handleDepartureChange(event: { target: { value: string } }) {
    this.departure = event.target.value;
  }

  handleDestinationChange(event: { target: { value: string } }) {
    this.destination = event.target.value;
  }

  onAddFlight() {
    this.dispatchMessage([
      "cart/add",
      {
        item: `Flight from ${this.departure} to ${this.destination} on ${this.date.toLocaleDateString()}`,
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
            <h2>Flights</h2>
          </div>
          <label for="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            @onchange=${this.handleDateChange}
          />
          <div class="flex-row">
            <div class="flex-col">
              <label>Departure</label>
              <input
                id="departure"
                type="text"
                name="departure"
                placeholder="Location"
                @change=${this.handleDepartureChange}
              />
            </div>
            <div class="flex-col">
              <label>Destination</label>
              <input
                id="destination"
                type="text"
                name="destination"
                placeholder="Location"
                @change=${this.handleDestinationChange}
              />
            </div>
          </div>
          <button @click=${this.onAddFlight}>Add Flight</button>
        </div>
      </section>`;
  }
}
