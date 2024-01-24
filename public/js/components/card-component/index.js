import { StyledComponent } from '/js/components/styled-component/index.js'

/** @typedef {import("/js/models/card.js").Card} Card */

export class CardComponent extends StyledComponent {
  #card
  
  /** @param {Card} card */
  constructor(card) {
    super()

    this.#card = card
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/components/card-component/styles.css')

    const container = document.createElement('div')
    container.setAttribute('class', 'card')

    const name = document.createElement('p')
    name.setAttribute('class', 'card-name')

    const type = document.createElement('p')
    type.setAttribute('class', 'card-type')

    this.#card.subscribe('name', () => name.innerText = this.#card.name)
    this.#card.subscribe('type', () => type.innerText = this.#card.type)

    shadow.appendChild(container)
    container.appendChild(name)
    container.appendChild(type)
  }
}

customElements.define('card-component', CardComponent)