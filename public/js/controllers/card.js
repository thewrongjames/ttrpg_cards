import { CardTextView } from '/js/views/card-text/index.js'
import { CardTagsView } from '/js/views/card-tags/index.js'
import { CardDetailsView } from '/js/views/card-details/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections/index.js').CardSection} CardSection */
/** @typedef {import('/js/models/card-sections/index.js').CardText} CardText */
/** @typedef {import('/js/models/card-sections/index.js').CardTags} CardTags */
/** @typedef {import('/js/models/card-sections/index.js').CardDetails} CardDetails */

/** @typedef {import('/js/views/card/index.js').CardView} CardView */

export class CardController {
  #card
  #cardView

  /**
   * @param {Card} card
   * @param {CardView} cardView
   */
  constructor(card, cardView) {
    this.#card = card
    this.#cardView = cardView

    this.#card.subscribe('name', () => this.#cardView.name = this.#card.name)
    this.#card.subscribe('type', () => this.#cardView.type = this.#card.type)

    this.#card.sections.subscribe('add', ({index, item}) => this.#addCardSection(index, item))
    this.#card.sections.subscribe('remove', ({index, item}) => this.#removeCardSection(index, item))
  }

  /**
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
      view = this.#getViewConntectToCardDetails(cardSection)
      break
    }

    this.#cardView.addSection(index, view)
  }

  /**
   * @param {number} index 
   * @param {CardSection} cardSection 
   */
  #removeCardSection(index, cardSection) {
    switch (cardSection.sectionName) {
    case 'CardText':
      this.#disconnectCardText(cardSection)
      break
    case 'CardTags':
      this.#disconnectCardTags(cardSection)
      break
    case 'CardDetails':
      this.#disconnectCardDetails(cardSection)
      break
    default: {
      /** @type {never} */
      // eslint-disable-next-line no-unused-vars
      const exhaustivenessCheck = cardSection
    }
    }
  }

  /**
   * @param {CardText} cardText
   * @returns {CardTextView}
   */
  #getViewConnectedToCardText(cardText) {
    const cardTextView = new CardTextView()
    cardText.subscribe('text', () => cardTextView.text.innerText = cardText.text)
    return cardTextView
  }

  /** @param {CardText} cardText */
  #disconnectCardText(cardText) {
    cardText.unsubscribeAll()
  }

  /**
   * @param {CardTags} cardTags 
   * @returns {CardTagsView}
   */
  #getViewConnectedToCardTags(cardTags) {
    const cardTagsView = new CardTagsView()
    cardTags.tags.subscribe('add', ({index, item: tag}) => cardTagsView.addTag(index, tag))
    cardTags.tags.subscribe('remove', ({index}) => cardTagsView.removeTag(index))
    return cardTagsView
  }

  /** @param {CardTags} cardTags */
  #disconnectCardTags(cardTags) {
    cardTags.tags.unsubscribeAll()
  }

  /**
   * @param {CardDetails} cardDetails
   * @returns {CardDetailsView} 
   */
  #getViewConntectToCardDetails(cardDetails) {
    const cardDetailsView = new CardDetailsView()

    cardDetails.details.subscribe('add', ({index, item: detail}) => {
      cardDetailsView.addDetail(index, detail.key, detail.value)
      detail.subscribe('key', () => cardDetailsView.setDetailKey(index, detail.key))
      detail.subscribe('value', () => cardDetailsView.setDetailValue(index, detail.value))
    })
    
    cardDetails.details.subscribe('remove', ({index, item: detail}) => {
      cardDetailsView.removeDetail(index)
      detail.unsubscribeAll()
    })

    return cardDetailsView
  }

  /** @param {CardDetails} cardDetails  */
  #disconnectCardDetails(cardDetails) {
    cardDetails.details.all().forEach(detail => detail.unsubscribeAll())
    cardDetails.details.unsubscribeAll()
  }
}