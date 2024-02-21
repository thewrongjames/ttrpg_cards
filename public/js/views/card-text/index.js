import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTextView extends StyledComponent {
  #text

  constructor() {
    super(['/js/views/card-text/styles.css'])

    this.#text = document.createElement('p')

    this.shadowRoot.appendChild(this.#text)
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
