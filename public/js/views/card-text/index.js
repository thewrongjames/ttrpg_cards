import { StyledComponent } from '/js/library/styled-component/index.js'

/** @typedef {import('/js/models/card-sections').CardText} CardText */

export class CardTextView extends StyledComponent {
  #cardText

  /** @param {CardText} cardText */
  constructor(cardText) {
    super()

    this.#cardText = cardText
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card-text/styles.css')
    const text = document.createElement('p')
    
    this.#cardText.subscribe('text', () => text.innerText = this.#cardText.text)

    shadow.appendChild(text)
  }
}

customElements.define('card-text-view', CardTextView)
