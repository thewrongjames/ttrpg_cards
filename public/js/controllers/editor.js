import { CardDetail } from '/js/models/card-sections/card-details.js'
import { cardSections } from '/js/models/card-sections/index.js'

import { CardTextEditorView } from '/js/views/card-text-editor/index.js'
import { CardTagsEditorView } from '/js/views/card-tags-editor/index.js'
import { CardDetailsEditorView } from '/js/views/card-details-editor/index.js'
import { CardHeadingEditorView } from '/js/views/card-heading-editor/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('js/models/card-sections/index.js').CardSection} CardSection */
/** @typedef {import('js/models/card-sections/index.js').CardSectionName} CardSectionName */
/** @typedef {import('js/models/card-sections/index.js').CardText} CardText */
/** @typedef {import('js/models/card-sections/index.js').CardTags} CardTags */
/** @typedef {import('js/models/card-sections/index.js').CardDetails} CardDetails */
/** @typedef {import('js/models/card-sections/index.js').CardHeading} CardHeading */

/** @typedef {import('/js/views/card-editor/index.js').CardEditorView} CardEditorView */
/** @typedef {import('/js/views/card-section-editor/index.js').CardSectionEditorView} CardSectionEditorView */

export class EditorController {
  /** @type {Set<() => void>} */
  #sectionUnsubscribers = new Set()

  #cardEditorView

  /**
   * Create an EditorController using the given cardEditorView. That view will be hooked up to any
   * Card that is later connected to this controller.
   * @param {CardEditorView} cardEditorView 
   */
  constructor(cardEditorView) {
    this.#cardEditorView = cardEditorView
  }

  /**
   * Disconnect any previously connected card model from the card editor view, and, if the given
   * card is not undefined, connect the editor view to the given card model.
   * @param {Card|undefined} card
   * @param {(() => void)|undefined} removalCallback
   */
  connect(card, removalCallback) {
    this.#cardEditorView.cardSelected = card !== undefined
    this.#disconnect()
    if (card !== undefined) {
      this.#connect(card, removalCallback)
    }
  }

  /**
   * Connect the editor view to the given card. This assumes that neither is connected to anything
   * else.
   * @param {Card} card
   * @param {(() => void)|undefined} removalCallback
   */
  #connect(card, removalCallback) {
    // Setup the initial values of the input fields from the model.
    for (const [index, section] of card.frontSections.entries()) {
      this.#addCardSection(card, index, section)
    }
    
    // Propagate changes back to the model.
    this.#cardEditorView.onAddSectionClicked = sectionName => this.#addNewCardSection(card, sectionName)
    this.#cardEditorView.onRemoveCardClicked = removalCallback
  }

  /** Disconnect the currently connected card from the editor view and clear the editor view. */
  #disconnect() {
    this.#sectionUnsubscribers.forEach(sectionUnsubscriber => sectionUnsubscriber())
    this.#sectionUnsubscribers.clear()
    this.#cardEditorView.removeAllSections()

    this.#cardEditorView.onAddSectionClicked = undefined
    this.#cardEditorView.onRemoveCardClicked = undefined
  }

  /**
   * Create a new empty card section with the given name on both the model and the editor, connected
   * up so changes on the editor are pushed back to the model.
   * @param {Card} card
   * @param {CardSectionName} sectionName
   */
  #addNewCardSection(card, sectionName) {
    const cardSection = new cardSections[sectionName]()
    const index = card.frontSections.add(cardSection)
    this.#addCardSection(card, index, cardSection)
  }

  /**
   * Create the UI in the editor for controlling the given card section. It should update the model
   * in accordance with changes in the editor view, and handle it's own removal.
   * @param {Card} card
   * @param {number} index
   * @param {CardSection} cardSection 
   */
  #addCardSection(card, index, cardSection) {
    /** @type {CardSectionEditorView} */
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
      case 'CardHeading':
        view = this.#getViewConnectedToCardHeading(cardSection)
        break
    }

    view.onRemoveButtonClicked = () => {
      card.frontSections.remove(index)
      this.#cardEditorView.removeSection(index)
    }

    this.#cardEditorView.addSection(index, view)
  }

  /**
   * @param {CardText} cardText
   * @returns {CardTextEditorView}
   */
  #getViewConnectedToCardText(cardText) {
    const cardTextEditorView = new CardTextEditorView()

    cardTextEditorView.text = cardText.text
    cardTextEditorView.onTextChange = () => cardText.text = cardTextEditorView.text

    return cardTextEditorView
  }

  /**
   * @param {CardTags} cardTags 
   * @returns {CardTagsEditorView}
   */
  #getViewConnectedToCardTags(cardTags) {
    const cardTagsEditorView = new CardTagsEditorView()
    
    /**
     * Add a tag to the view that knows how to remove itself from the model.
     * @type {(index: number, text: string) => void}
     */
    const addTag = (index, text) => cardTagsEditorView.addTag(
      index,
      text,
      () => cardTags.tags.remove(index),
    )

    // Update the view when the model changes.
    this.#sectionUnsubscribers.add(
      cardTags.tags.subscribe('remove', ({index}) => cardTagsEditorView.removeTag(index)),
    )
    this.#sectionUnsubscribers.add(
      cardTags.tags.subscribe('add', ({index, item}) => addTag(index, item)),
    )

    // When the view wants to add a tag, add it to the model. The listener above will ensure it then
    // gets added to the view.
    cardTagsEditorView.onAddTag = () => {
      const newTagText = cardTagsEditorView.newTagText
      cardTagsEditorView.newTagText = ''
      cardTags.tags.add(newTagText)
    }

    // Add tags that already exist on the model to the view.
    for (const [index, tagText] of cardTags.tags.entries()) {
      addTag(index, tagText)
    }

    return cardTagsEditorView
  }

  /**
   * @param {CardDetails} cardDetails
   * @returns {CardDetailsEditorView} 
   */
  #getViewConnectedToCardDetails(cardDetails) {
    const cardDetailsEditorView = new CardDetailsEditorView()

    /**
     * Add a detail to the view that knows how to update its fields in, and remove itself from, the
     * model
     * @param {number} index 
     * @param {CardDetail} detail
     */
    const addDetail = (index, detail) => cardDetailsEditorView.addDetail(
      index,
      detail.key,
      detail.value,
      newKey => detail.key = newKey,
      newValue => detail.value = newValue,
      () => cardDetails.details.remove(index),
    )

    // Update the view when the model changes.
    this.#sectionUnsubscribers.add(
      cardDetails.details.subscribe('remove', ({index}) => cardDetailsEditorView.removeTag(index)),
    )
    this.#sectionUnsubscribers.add(
      cardDetails.details.subscribe('add', ({index, item}) => addDetail(index, item)),
    )

    // When the view wants to add a detail, we add an empty detail to the model. The listener above
    // will ensure that it then gets added to the view.
    cardDetailsEditorView.onAddDetail = () => {
      cardDetails.details.add(new CardDetail())
    }

    // Add pre-existing model details to the view.
    for (const [index, detail] of cardDetails.details.entries()) {
      addDetail(index, detail)
    }

    return cardDetailsEditorView
  }

  /**
   * @param {CardHeading} cardHeading
   * @returns {CardHeadingEditorView}
   */
  #getViewConnectedToCardHeading(cardHeading) {
    const cardHeadingEditorView = new CardHeadingEditorView(cardHeading.text, cardHeading.level, cardHeading.justification)
    cardHeadingEditorView.onTextChange = () => {
      console.log(1)
      cardHeading.text = cardHeadingEditorView.text
    }
    cardHeadingEditorView.onLevelChange = () => {
      console.log(2)
      cardHeading.level = cardHeadingEditorView.level
    }
    cardHeadingEditorView.onJustificationChange = () => cardHeading.justification = cardHeadingEditorView.justification

    return cardHeadingEditorView
  }
}