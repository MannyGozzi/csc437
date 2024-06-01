import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Model } from "../model";
import { Msg } from "../messages";

export class ItemsList extends View<Model, Msg> {
  @state()
  private items: string[] = [];

  constructor() {
    super("blazing:model");
  }

  render() {
    return html`
    <link rel="stylesheet" href="/styles/app.css" />
    <link rel="stylesheet" href="/styles/tokens.css" />
     <div>
        <h3>Items List</h3>
        <button @click=${() => (this.items = [...this.items, `Travel Item ${this.items.length}`])}>Add Item</button
        <ul>
          ${this.model.cart?.map((item) => html`<li>${item}</li>`)}
          ${this.items.map((item) => html`<li>${item}</li>`)}
        </ul>
     </div>
    `;
  }

  static styles = css``;
}
