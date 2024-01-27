import { SelectView } from '/js/views/select/index.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections/index.js').CardSectionName} CardSectionName */

export class CardEditorView extends StyledComponent {
  /** @type {Record<number, HTMLElement>} */
  #sections = {}
  /** @type {SelectView<CardSectionName>} */
  #sectionAdderSelector

  #nameInput
  #typeInput
  #sectionsContainer
  #sectionAdderButton

  constructor() {
    super()

    this.#nameInput = document.createElement('input')
    this.#nameInput.setAttribute('id', 'editor-name')
    this.#nameInput.setAttribute('type', 'text')

    this.#typeInput = document.createElement('input')
    this.#typeInput.setAttribute('id', 'editor-type')
    this.#typeInput.setAttribute('type', 'text')

    this.#sectionsContainer = document.createElement('div')
    this.#sectionsContainer.setAttribute('class', 'sections')

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
    const shadow = this.getStyledShadow('/js/views/card-editor/styles.css')

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
    container.appendChild(this.#sectionsContainer)
    container.appendChild(sectionAdder)

    shadow.appendChild(container)
  }

  get nameInput() {
    return this.#nameInput
  }

  get typeInput() {
    return this.#typeInput
  }

  /**
   * @param {number} index 
   * @param {HTMLElement} element 
   */
  addSection(index, element) {
    // We wrap the section in a div so we can do some common styling here.
    const sectionContainer = document.createElement('div')
    sectionContainer.appendChild(element)

    this.#sections[index] = sectionContainer
    this.#sectionsContainer.appendChild(sectionContainer)
  }
  
  /** @param {number} index */
  removeSection(index) {
    this.#sections[index]?.remove()
    delete this.#sections[index]
  }
}

customElements.define('card-editor-view', CardEditorView)