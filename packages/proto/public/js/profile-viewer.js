import { prepareTemplate } from "./template.js";
import { Auth, Observer } from "@calpoly/mustang";

export class ProfileViewElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
        <link rel="stylesheet" href="/styles/tokens.css" />
        <link rel="stylesheet" href="/styles/app.css" />
        <h3>Profile View [Id: <slot name="id"></slot>]</h3>
      <section class="container border">
        <dl>
            <div class="flex-row">
                <dt>Name<dt>
                <dd><slot name="name"></slot></dd>
                <dt>Nickname</dt>
                <dd><slot name="nickname"></slot></dd>
            </div>
            <div class="flex-row">
                <dt>Home</dt>
                <dd><slot name="home"></slot></dd>
                <dt>Airports</dt>
                <dd><slot name="airports"></slot></dd>
            </div>
            <div class="flex-row">
                <dt>Avatar</dt>
                <dd><slot name="avatar"></slot></dd>
                <dt>Color</dt>
                <dd><slot name="color"></slot></dd>
            </div>
        </dl>
      </section>
    </template>
  `);

  constructor() {
    super();
    this._authObserver = new Observer(this, "blazing:auth");
    this.attachShadow({ mode: "open" }).appendChild(
      ProfileViewElement.template.cloneNode(true)
    );
  }

  get src() {
    return this.getAttribute("src");
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }
  

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
        this._user = user;
        if (this.src) {
        fetch(this.src, {
            headers: this.authorization
        })
            .then(response => response.json())
            .then(json => {
                for (const [key, value] of Object.entries(json)) {
                    const slot = this.shadowRoot.querySelector(`slot[name="${key}"]`);
                    if (slot) {
                        slot.textContent = value;
                    }
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));
        }
    });
  }
}

customElements.define("profile-view", ProfileViewElement);