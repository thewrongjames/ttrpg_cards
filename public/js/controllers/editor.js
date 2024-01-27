import { CardText, CardTags, CardDetails } from '/js/models/card-sections/index.js'

import { CardTextEditorView } from '/js/views/card-text-editor/index.js'
import { CardTagsEditorView } from '/js/views/card-tags-editor/index.js'
import { CardDetailsEditorView } from '/js/views/card-details-editor/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('js/models/card-sections/index.js').CardSection} CardSection */
/** @typedef {import('js/models/card-sections/index.js').CardSectionName} CardSectionName */

/** @typedef {import('/js/views/card-editor/index.js').CardEditorView} CardEditorView */

export class EditorController {
  #card
  #cardEditorView

  /**
   * @param {Card} card 
   * @param {CardEditorView} cardEditorView 
   */
  constructor(card, cardEditorView) {
    this.#card = card
    this.#cardEditorView = cardEditorView

    // Setup the initial values of the input fields from the model.

    this.#cardEditorView.nameInput.value = this.#card.name
    this.#cardEditorView.typeInput.value = this.#card.type

    this.#card.sections.all().forEach((section, index) => this.#addCardSection(index, section))

    // Propagate changes back to the model.

    this.#cardEditorView.nameInput.addEventListener('input', () => this.#card.name = this.#cardEditorView.nameInput.value)
    this.#cardEditorView.typeInput.addEventListener('input', () => this.#card.type = this.#cardEditorView.typeInput.value)
  }

  /**
   * Create a new empty card section with the given name on both the model and the editor, connected
   * up so changes on the editor are pushed back to the model.
   * @param {CardSectionName} sectionName
   */
  #addNewCardSection(sectionName) {

  }

  /**
   * Create the UI in the editor for controlling the given card section.
   * @param {number} index 
   * @param {CardSection} cardSection 
   */
  #addCardSection(index, cardSection) {
    /** @type {HTMLElement} */
    let view

    switch (cardSection.sectionName) {
    case 'CardText':
      view = this.#getViewConnectedToCardText(cardSection)
      break
    case 'CardTags':
      view = this.#getViewConnectedToCardTags(cardSection)
      break
    case 'CardDetails':
      view = this.#getViewConnectedToCardDetails(cardSection)
      break
    }

    this.#cardEditorView.addSection(index, view)
  }

  /**
   * Remove the card section at the given index from both the model and the editor UI, tearing down
   * any subscriptions connecting the two.
   * @param {number} index
   */
  #removeCardSection(index) {

  }

  /**
   * @param {CardText} cardText
   * @returns {CardTextEditorView}
   */
  #getViewConnectedToCardText(cardText) {
    const cardTextEditorView = new CardTextEditorView()
    return cardTextEditorView
  }

  /** @param {CardText} cardText */
  #disconnectCardText(cardText) {
  }

  /**
   * @param {CardTags} cardTags 
   * @returns {CardTagsEditorView}
   */
  #getViewConnectedToCardTags(cardTags) {
    const cardTagsEditorView = new CardTagsEditorView()
    return cardTagsEditorView
  }

  /** @param {CardTags} cardTags */
  #disconnectCardTags(cardTags) {
  }

  /**
   * @param {CardDetails} cardDetails
   * @returns {CardDetailsEditorView} 
   */
  #getViewConnectedToCardDetails(cardDetails) {
    const cardDetailsEditorView = new CardDetailsEditorView()
    return cardDetailsEditorView
  }

  /** @param {CardDetails} cardDetails  */
  #disconnectCardDetails(cardDetails) {
  }
}