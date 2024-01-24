import { StyledComponent } from '/js/components/styled-component/index.js'

/** @typedef {import("/js/models/card.js").Card} Card */

export class InputComponent extends StyledComponent {
  #card
  
  /** @param {Card} card */
  constructor(card) {
    super()

    this.#card = card
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/components/input-component/styles.css')

    const container = document.createElement('div')
    container.setAttribute('class', 'input')

    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'input-name')
    nameLabel.innerText = 'Name:'

    const nameInput = document.createElement('input')
    nameInput.setAttribute('id', 'input-name')
    nameInput.setAttribute('type', 'text')

    const typeLabel = document.createElement('label')
    typeLabel.setAttribute('for', 'input-type')
    typeLabel.innerText = 'Type:'

    const typeInput = document.createElement('input')
    typeInput.setAttribute('id', 'input-type')
    typeInput.setAttribute('type', 'text')

    nameInput.value = this.#card.name
    typeInput.value = this.#card.type
    nameInput.addEventListener('input', () => this.#card.name = nameInput.value)
    typeInput.addEventListener('input', () => this.#card.type = typeInput.value)

    shadow.appendChild(container)
    container.appendChild(nameLabel)
    container.appendChild(nameInput)
    container.appendChild(typeLabel)
    container.appendChild(typeInput)
  }
}

customElements.define('input-component', InputComponent)