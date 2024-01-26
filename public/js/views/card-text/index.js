import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTextView extends StyledComponent {
  #text

  constructor() {
    super()

    this.#text = document.createElement('p')
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card-text/styles.css')
    shadow.appendChild(this.#text)
  }

  get text() {
    return this.#text
  }
}

customElements.define('card-text-view', CardTextView)
