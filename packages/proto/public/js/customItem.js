class CustomItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "flex-col");
    wrapper.setAttribute("style", "box-shadow: var(--shadow); padding: var(--padding-md); background: var(--color-fg); border-radius: var(--rounded);");
    const h = document.createElement("h2");
    h.textContent = "Custom item content!";
    const p = document.createElement("p");
    p.textContent = "Another custom item content!";
    wrapper.appendChild(h);
    wrapper.appendChild(p);
    shadow.appendChild(wrapper);
 }
}

customElements.define("custom-item", CustomItem);