import { StyledComponent } from '/js/library/styled-component/index.js'
import { IndexError } from '/js/library/errors/index-error.js'

import { SelectView } from '/js/views/select/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections/index.js').CardSectionName} CardSectionName */

export class CardEditorView extends StyledComponent {
  static #cardSelectedAttributeName = 'card-selected'

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
  /** @type {(() => void)|undefined} */
  #onRemoveCardClicked

  #nameInput
  #typeInput
  #sectionsContainer
  #sectionAdderButton
  #container
  #withSelectedCardContainer
  #withoutSelectedCardContainer

  constructor() {
    super(['/js/views/card-editor/styles.css'])

    this.#container = document.createElement('div')
    this.#container.classList.add('card-editor')

    this.#withSelectedCardContainer = document.createElement('div')
    this.#withSelectedCardContainer.classList.add('with-selected-card')

    this.#withoutSelectedCardContainer = document.createElement('div')
    this.#withoutSelectedCardContainer.classList.add('without-selected-card')

    this.#nameInput = document.createElement('input')
    this.#nameInput.setAttribute('id', 'editor-name')
    this.#nameInput.setAttribute('type', 'text')
    this.#nameInput.addEventListener('input', () => this.#onNameTextChange?.())
    
    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'editor-name')
    nameLabel.innerText = 'Name:'
    const nameContainer = document.createElement('div')
    nameContainer.classList.add('input-container')
    nameContainer.appendChild(nameLabel)
    nameContainer.appendChild(this.#nameInput)

    this.#typeInput = document.createElement('input')
    this.#typeInput.setAttribute('id', 'editor-type')
    this.#typeInput.setAttribute('type', 'text')
    this.#typeInput.addEventListener('input', () => this.#onTypeTextChange?.())

    const typeLabel = document.createElement('label')
    typeLabel.setAttribute('for', 'editor-type')
    typeLabel.innerText = 'Type:'
    const typeContainer = document.createElement('div')
    typeContainer.classList.add('input-container')
    typeContainer.appendChild(typeLabel)
    typeContainer.appendChild(this.#typeInput)

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

    const sectionAdder = document.createElement('div')
    sectionAdder.setAttribute('class', 'section-adder')
    sectionAdder.appendChild(this.#sectionAdderSelector)
    sectionAdder.appendChild(this.#sectionAdderButton)

    const removeCardButton = document.createElement('button')
    removeCardButton.classList.add('remove-card-button')
    removeCardButton.addEventListener('click', () => this.#onRemoveCardClicked?.())
    removeCardButton.innerText = 'Remove card'

    this.#withSelectedCardContainer.appendChild(nameContainer)
    this.#withSelectedCardContainer.appendChild(typeContainer)
    this.#withSelectedCardContainer.appendChild(this.#sectionsContainer)
    this.#withSelectedCardContainer.appendChild(sectionAdder)
    this.#withSelectedCardContainer.appendChild(removeCardButton)

    const noCardSelectedMessage = document.createElement('p')
    noCardSelectedMessage.innerText = 'No card selected. Click \'Add card\' above to create one.'

    this.#withoutSelectedCardContainer.appendChild(noCardSelectedMessage)

    this.#container.appendChild(this.#withSelectedCardContainer)
    this.#container.appendChild(this.#withoutSelectedCardContainer)

    this.shadowRoot.appendChild(this.#container)
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

  /** @param {(() => void)|undefined} callback  */
  set onRemoveCardClicked(callback) {
    this.#onRemoveCardClicked = callback
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

  removeAllSections() {
    Object.values(this.#sections).forEach(section => section.remove())
    this.#sections = {}
  }

  /** @returns {boolean} */
  get cardSelected() {
    return this.#container.hasAttribute(CardEditorView.#cardSelectedAttributeName)
  }
  /** @param {boolean} newCardSelected  */
  set cardSelected(newCardSelected) {
    if (newCardSelected) {
      this.#container.setAttribute(CardEditorView.#cardSelectedAttributeName, 'true')
    } else {
      this.#container.removeAttribute(CardEditorView.#cardSelectedAttributeName)
    }
  }
}

customElements.define('card-editor-view', CardEditorView)