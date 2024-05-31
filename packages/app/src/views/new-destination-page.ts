import { html } from "lit";
import { Model } from "../model";
import { Msg } from "../messages";
import { View } from "@calpoly/mustang";

export class NewDestinationPage extends View<Model, Msg> {
  id: string;
  name: string;
  nickname: string;
  home: string;
  airports: string;
  color: string;
  avatar: string;

  constructor() {
    super("blazing:model");
    this.id = "";
    this.name = "";
    this.nickname = "";
    this.home = "";
    this.airports = "";
    this.avatar = "";
    this.color = "";
  }

  render() {
    return html` <link rel="stylesheet" href="/styles/app.css" />
      <link rel="stylesheet" href="/styles/tokens.css" />
      <section class="center">
        <div class="container">
          <div class="flex-row">
            <a href="../"><button>←</button></a>
            <h2>New Destination</h2>
          </div>
          <div class="flex-row">
            <form id="destinationForm" autocomplete="off">
              <div class="flex-col">
                <div class="flex-col">
                  <label>Id</label>
                  <input
                    id="id"
                    type="text"
                    name="id"
                    placeholder="Id"
                    @change=${(e: any) => (this.id = e.target.value)}
                  />
                </div>
                <div class="flex-col">
                  <label>Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    @change=${(e: any) => (this.name = e.target.value)}
                  />
                </div>
                <div class="flex-col">
                  <label>Nickname</label>
                  <input
                    id="nickname"
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    @change=${(e: any) => (this.nickname = e.target.value)}
                  />
                </div>
                <div class="flex-col">
                  <label>Home</label>
                  <input
                    id="home"
                    type="text"
                    name="home"
                    placeholder="Home"
                    @cbanged=${(e: any) => (this.home = e.target.value)}
                  />
                </div>
                <div class="flex-col">
                  <label>Airports</label>
                  <input
                    id="airports"
                    type="text"
                    name="airports"
                    placeholder="Airports (comma separated)"
                    @change=${(e: any) => (this.airports = e.target.value)}
                  />
                </div>
                <div class="flex-col">
                  <label>Avatar</label>
                  <input
                    id="avatar"
                    type="text"
                    name="avatar"
                    placeholder="Avatar Url"
                    @change=${(e: any) => (this.avatar = e.target.value)}
                  />
                </div>
                <div class="flex-col">
                  <label>Color</label>
                  <input
                    id="color"
                    type="text"
                    name="color"
                    placeholder="Color"
                    @change=${(e: any) => (this.color = e.target.value)}
                  />
                </div>
                <button type="submit" @click=${this.onSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  onSubmit(e) {
    e.preventDefault();
    this.dispatchMessage([
      "tour/save",
      {
        tourid: this.id,
        tour: {
          id: this.id,
          name: this.name,
          nickname: this.nickname,
          home: this.home,
          airports: this.airports.split(",").map((a) => a.trim()),
          avatar: this.avatar,
          color: this.color,
        },
      },
    ]);
    /* reset all fields in element render */
    this.shadowRoot?.getElementById("destinationForm")?.reset();
  }
}
