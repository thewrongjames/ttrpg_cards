import { StyledComponent } from '/js/library/styled-component/index.js'
import { IndexError } from '/js/library/errors/index-error.js'

import { SelectView } from '/js/views/select/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections/index.js').CardSectionName} CardSectionName */

export class CardEditorView extends StyledComponent {
  /** @type {Record<number, HTMLElement>} */
  #sections = {}
  /** @type {SelectView<CardSectionName>} */
  #sectionAdderSelector
  /** @type {(() => void)|undefined} */
  #onNameTextChange
  /** @type {(() => void)|undefined} */
  #onTypeTextChange
  /** @type {((cardSectionName: CardSectionName) => void)|undefined} */
  #onAddSectionClicked

  #nameInput
  #typeInput
  #sectionsContainer
  #sectionAdderButton

  constructor() {
    super()

    this.#nameInput = document.createElement('input')
    this.#nameInput.setAttribute('id', 'editor-name')
    this.#nameInput.setAttribute('type', 'text')
    this.#nameInput.addEventListener('input', () => this.#onNameTextChange?.())
    
    this.#typeInput = document.createElement('input')
    this.#typeInput.setAttribute('id', 'editor-type')
    this.#typeInput.setAttribute('type', 'text')
    this.#typeInput.addEventListener('input', () => this.#onTypeTextChange?.())

    this.#sectionsContainer = document.createElement('div')
    this.#sectionsContainer.setAttribute('class', 'sections')

    this.#sectionAdderSelector = new SelectView([
      ['CardText', 'Text'],
      ['CardTags', 'Tags'],
      ['CardDetails', 'Details'],
    ])

    this.#sectionAdderButton = document.createElement('button')
    this.#sectionAdderButton.innerText = 'Add'
    this.#sectionAdderButton.addEventListener(
      'click',
      () => this.#onAddSectionClicked?.(this.#sectionAdderSelector.value),
    )
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-editor/styles.css'])

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

  get nameText() {
    return this.#nameInput.value
  }
  /** @param {string} newNameText */
  set nameText(newNameText) {
    this.#nameInput.value = newNameText
  }

  get typeText() {
    return this.#typeInput.value
  }
  /** @param {string} newTypeText  */
  set typeText(newTypeText) {
    this.#typeInput.value = newTypeText
  }

  /** @param {(() => void)|undefined} callback */
  set onNameTextChange(callback) {
    this.#onNameTextChange = callback
  }

  /** @param {(() => void)|undefined} callback */
  set onTypeTextChange(callback) {
    this.#onTypeTextChange = callback
  }

  /** @param {((cardSectionName: CardSectionName) => void)|undefined} callback */
  set onAddSectionClicked(callback) {
    this.#onAddSectionClicked = callback
  }

  /**
   * @param {number} index 
   * @param {HTMLElement} element
   * @throws {IndexError} If there is already a section at the given index.
   */
  addSection(index, element) {
    if (this.#sections[index] !== undefined) {
      throw new IndexError(`there is already a section at index ${index}`)
    }

    // We wrap the section in a div so we can do some common styling here.
    const sectionContainer = document.createElement('div')
    sectionContainer.appendChild(element)

    this.#sections[index] = sectionContainer
    this.#sectionsContainer.appendChild(sectionContainer)
  }
  
  /**
   * Remove the section at the given index if there is one, do nothing if there is not.
   * @param {number} index
   */
  removeSection(index) {
    this.#sections[index]?.remove()
    delete this.#sections[index]
  }
}

customElements.define('card-editor-view', CardEditorView)