import { SelectView } from '/js/views/select/index.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections/index.js').CardSectionName} CardSectionName */

export class EditorView extends StyledComponent {
  /** @type {SelectView<CardSectionName>} */
  #sectionAdderSelector

  #nameInput
  #typeInput
  #sectionAdderButton

  constructor() {
    super()

    this.#nameInput = document.createElement('input')
    this.#nameInput.setAttribute('id', 'editor-name')
    this.#nameInput.setAttribute('type', 'text')

    this.#typeInput = document.createElement('input')
    this.#typeInput.setAttribute('id', 'editor-type')
    this.#typeInput.setAttribute('type', 'text')

    this.#sectionAdderSelector = new SelectView([
      ['CardText', 'Text'],
      ['CardTags', 'Tags'],
      ['CardDetails', 'Details'],
    ])

    this.#sectionAdderButton = document.createElement('button')
    this.#sectionAdderButton.innerText = 'Add'
    this.#sectionAdderButton.addEventListener('click', () => console.log(this.#sectionAdderSelector.value))
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

    const sectionAdder = document.createElement('div')
    sectionAdder.setAttribute('class', 'section-adder')
    sectionAdder.appendChild(this.#sectionAdderSelector)
    sectionAdder.appendChild(this.#sectionAdderButton)

    container.appendChild(nameLabel)
    container.appendChild(this.#nameInput)
    container.appendChild(typeLabel)
    container.appendChild(this.#typeInput)
    container.appendChild(sectionAdder)

    shadow.appendChild(container)
  }

  get nameInput() {
    return this.#nameInput
  }

  get typeInput() {
    return this.#typeInput
  }
}

customElements.define('editor-view', EditorView)