import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";

export class ItemsList extends LitElement {
  @state()
  private items: string[] = [];

  render() {
    return html`
     <div>
        <p>Items List</p>
        <button @click=${() => (this.items = [...this.items, `Item ${this.items.length}`])}>Add Item</button
        <ul>
          ${this.items.map((item) => html`<li>${item}</li>`)}
        </ul>
     </div>
    `;
  }

  static styles = css``;
}
