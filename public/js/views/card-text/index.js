import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTextView extends StyledComponent {
  #text

  constructor() {
    super()

    this.#text = document.createElement('p')
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-text/styles.css'])
    shadow.appendChild(this.#text)
  }

  get text() {
    return this.#text.innerText
  }
  /** @param {string} newText  */
  set text(newText) {
    this.#text.innerText = newText
  }
}

customElements.define('card-text-view', CardTextView)
