import { StyledComponent } from '/js/library/styled-component/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */

export class EditorView extends StyledComponent {
  #nameInput
  #typeInput

  constructor() {
    super()

    this.#nameInput = document.createElement('input')
    this.#nameInput.setAttribute('id', 'editor-name')
    this.#nameInput.setAttribute('type', 'text')

    this.#typeInput = document.createElement('input')
    this.#typeInput.setAttribute('id', 'editor-type')
    this.#typeInput.setAttribute('type', 'text')
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/editor/styles.css')

    const container = document.createElement('div')
    container.setAttribute('class', 'editor')

    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'editor-name')
    nameLabel.innerText = 'Name:'

    const typeLabel = document.createElement('label')
    typeLabel.setAttribute('for', 'editor-type')
    typeLabel.innerText = 'Type:'

    shadow.appendChild(container)
    container.appendChild(nameLabel)
    container.appendChild(this.#nameInput)
    container.appendChild(typeLabel)
    container.appendChild(this.#typeInput)
  }

  get nameInput() {
    return this.#nameInput
  }

  get typeInput() {
    return this.#typeInput
  }
}

customElements.define('editor-view', EditorView)