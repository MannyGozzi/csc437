import { prepareTemplate } from "./template.js";

export class FormElement extends HTMLElement {
  static template = prepareTemplate(`
  <template>
    <link rel="stylesheet" href="styles/tokens.css" />
    <link rel="stylesheet" href="styles/app.css" />
    <form autocomplete="off">
    <div class="flex-col">
      <div class="flex-col">
        <label>Id</label>
        <input
          id="id"
          type="text"
          name="id"
          placeholder="Id"
        />
      </div>
      <div class="flex-col">
        <label>Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
        />
      </div>
      <div class="flex-col">
        <label>Nickname</label>
        <input
          id="nickname"
          type="text"
          name="nickname"
          placeholder="Nickname"
        />
      </div>
      <div class="flex-col">
        <label>Home</label>
        <input
          id="home"
          type="text"
          name="home"
          placeholder="Home"
        />
      </div>
      <div class="flex-col">
        <label>Airports</label>
        <input
          id="airports"
          type="text"
          name="airports"
          placeholder="Airports (comma separated)"
        />
      </div>
      <div class="flex-col">
        <label>Avatar</label>
        <input
          id="avatar"
          type="text"
          name="avatar"
          placeholder="Avatar Url"
        />
      </div>
      <div class="flex-col">
        <label>Color</label>
        <input
          id="color"
          type="text"
          name="color"
          placeholder="Color"
        />
      </div>
      <button type="submit">Submit</button>
    </div>
    </form>
  </template>`);


  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      FormElement.template.cloneNode(true)
    );
  }

  connectedCallback() {
    this.shadowRoot.querySelector('form').addEventListener("submit", (e) => {
      e.preventDefault();
      fetch('/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.shadowRoot.querySelector('#id').value,
          name: this.shadowRoot.querySelector('#name').value,
          nickname: this.shadowRoot.querySelector('#nickname').value,
          home: this.shadowRoot.querySelector('#home').value,
          airports: this.shadowRoot.querySelector('#airports').value.split(','),
          avatar: this.shadowRoot.querySelector('#avatar').value,
          color: this.shadowRoot.querySelector('#color').value,
        }),
      }).then(() => {
        this.shadowRoot.querySelector('form').reset();
        this.shadowRoot.querySelector('button').textContent = 'Submitted!';
      });
    }
  );
  }
}

customElements.define("form-element", FormElement);
