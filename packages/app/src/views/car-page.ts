import { View } from "@calpoly/mustang";
import { html } from "lit";
import { Model } from "../model";
import { Msg } from "../messages";

export class CarPage extends View<Model, Msg> {
  package: String;
  pickup: Date;
  return: Date;

  constructor() {
    super("blazing:model");
    this.package = "Toyota Corolla";
    this.pickup = new Date();
    this.return = new Date();
  }

  handlePackageChange(event: { target: { value: String } }) {
    this.package = event.target.value;
    console.log("Package selected:", this.package);
  }

  handlePickupChange(event: { target: { value: Date } }) {
    this.pickup = new Date(event.target.value);
    console.log("Pickup date selected:", this.pickup);
  }

  handleReturnChange(event: { target: { value: Date } }) {
    this.return = new Date(event.target.value);
    console.log("Return date selected:", this.return);
  }

  addCarToCart() {
    this.dispatchMessage([
      "cart/add",
      {
        item: `${this.package.toString()} | Pickup: ${this.pickup.toLocaleDateString()} | Return: ${this.return.toLocaleDateString()}`,
      },
    ]);
  }

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
          <select name="package" @change=${this.handlePackageChange}>
            <option value="Toyota Corolla">Toyota Corolla</option>
            <option value="Tesla Model 3">Tesla Model 3</option>
            <option value="Toyota Camry">Toyota Camry</option>
          </select>
          <div class="flex-row">
            <div class="flex-col">
              <label>Pickup</label>
              <input
                id="pickup"
                type="date"
                name="pickup"
                @change=${this.handlePickupChange}
              />
            </div>
            <div class="flex-col">
              <label>Return Date</label>
              <input
                id="return"
                type="date"
                name="return"
                @change=${this.handleReturnChange}
              />
            </div>
          </div>
          <button @click=${this.addCarToCart}>Reserve</button>
        </div>
      </section>
    `;
  }
}
