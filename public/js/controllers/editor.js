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

    this.#cardEditorView.nameText = this.#card.name
    this.#cardEditorView.typeText = this.#card.type

    this.#card.sections.all().forEach((section, index) => this.#addCardSection(index, section))

    // Propagate changes back to the model.

    this.#cardEditorView.onNameTextChange = () => this.#card.name = this.#cardEditorView.nameText
    this.#cardEditorView.onTypeTextChange = () => this.#card.type = this.#cardEditorView.typeText
  }

  /**
   * Create a new empty card section with the given name on both the model and the editor, connected
   * up so changes on the editor are pushed back to the model.
   * @param {CardSectionName} sectionName
   */
  #addNewCardSection(sectionName) {

  }

  /**
   * Create the UI in the editor for controlling the given card section. It should update the model
   * in accordance with changes in the editor view, and handle it's own removal.
   * @param {number} index 
   * @param {CardSection} cardSection 
   */
  #addCardSection(index, cardSection) {
    /** @type {HTMLElement} */
    let view

    switch (cardSection.sectionName) {
    case 'CardText':
      view = this.#getViewConnectedToCardText(index, cardSection)
      break
    case 'CardTags':
      view = this.#getViewConnectedToCardTags(index, cardSection)
      break
    case 'CardDetails':
      view = this.#getViewConnectedToCardDetails(index, cardSection)
      break
    }

    this.#cardEditorView.addSection(index, view)
  }

  /**
   * @param {number} index
   * @param {CardText} cardText
   * @returns {CardTextEditorView}
   */
  #getViewConnectedToCardText(index, cardText) {
    const cardTextEditorView = new CardTextEditorView()

    cardTextEditorView.text = cardText.text
    cardTextEditorView.onTextChange = () => cardText.text = cardTextEditorView.text

    cardTextEditorView.onRemoveButtonClicked = () => {
      // Disconnect the view's callbacks.
      cardTextEditorView.onTextChange = undefined
      cardTextEditorView.onRemoveButtonClicked = undefined
      
      // Remove the section from the model.
      this.#card.sections.remove(index)
      
      // Remove the section from the editor UI.
      this.#cardEditorView.removeSection(index)
    }

    return cardTextEditorView
  }

  /**
   * @param {number} index
   * @param {CardTags} cardTags 
   * @returns {CardTagsEditorView}
   */
  #getViewConnectedToCardTags(index, cardTags) {
    const cardTagsEditorView = new CardTagsEditorView()
    return cardTagsEditorView
  }

  /**
   * @param {number} index
   * @param {CardDetails} cardDetails
   * @returns {CardDetailsEditorView} 
   */
  #getViewConnectedToCardDetails(index, cardDetails) {
    const cardDetailsEditorView = new CardDetailsEditorView()
    return cardDetailsEditorView
  }
}