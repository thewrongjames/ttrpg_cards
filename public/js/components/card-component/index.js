/** @typedef {import("/js/models/card.js").Card} Card */

export class CardComponent extends HTMLElement {
  #card
  
  /** @param {Card} card */
  constructor(card) {
    super()

    this.#card = card
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'})

    const stylesLink = document.createElement('link')
    stylesLink.setAttribute('rel', 'stylesheet')
    stylesLink.setAttribute('href', '/js/components/card-component/styles.css')

    const container = document.createElement('div')
    container.setAttribute('class', 'card')

    const name = document.createElement('p')
    name.setAttribute('class', 'card-name')

    const type = document.createElement('p')
    type.setAttribute('class', 'card-type')

    this.#card.subscribe('name', () => name.innerText = this.#card.name)
    this.#card.subscribe('type', () => type.innerText = this.#card.type)

    shadow.appendChild(stylesLink)
    shadow.appendChild(container)
    container.appendChild(name)
    container.appendChild(type)
    
  }
}

customElements.define('card-component', CardComponent)