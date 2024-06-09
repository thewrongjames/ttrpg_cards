import { CardTextView } from '/js/views/card-text/index.js'
import { CardTagsView } from '/js/views/card-tags/index.js'
import { CardDetailsView } from '/js/views/card-details/index.js'
import { CardHeadingView } from '/js/views/card-heading/index.js'

/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections/index.js').CardSection} CardSection */
/** @typedef {import('/js/models/card-sections/index.js').CardText} CardText */
/** @typedef {import('/js/models/card-sections/index.js').CardTags} CardTags */
/** @typedef {import('/js/models/card-sections/index.js').CardDetails} CardDetails */
/** @typedef {import('/js/models/card-sections/index.js').CardHeading} CardHeading */
/** @typedef {import('/js/models/card-sections/card-details').CardDetail} CardDetail */

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

    this.#card.frontSections.subscribe('add', ({index, item}) => this.#addCardViewSection(index, item))
    this.#card.frontSections.subscribe(
      'remove',
      ({index, item}) => this.#removeCardViewSection(index, item),
    )

    for (const [index, section] of this.#card.frontSections.entries()) {
      this.#addCardViewSection(index, section)
    }
  }

  get card() {
    return this.#card
  }

  get cardView() {
    return this.#cardView
  }

  /**
   * @param {number} index 
   * @param {CardSection} cardSection 
   */
  #addCardViewSection(index, cardSection) {
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
      case 'CardHeading':
        view = this.#getViewConnectedToCardHeading(cardSection)
        break
    }

    this.#cardView.addSection(index, view)
  }

  /**
   * @param {number} index 
   * @param {CardSection} cardSection 
   */
  #removeCardViewSection(index, cardSection) {
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
      case 'CardHeading':
        this.#disconnectCardHeading(cardSection)
        break
      default: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        /** @type {never} */
        const exhaustivenessCheck = cardSection
        /* eslint-enable @typescript-eslint/no-unused-vars */
      }
    }

    this.#cardView.removeSection(index)
  }

  /**
   * @param {CardText} cardText
   * @returns {CardTextView}
   */
  #getViewConnectedToCardText(cardText) {
    const cardTextView = new CardTextView()

    cardText.subscribe('text', () => cardTextView.text = cardText.text)

    cardTextView.text = cardText.text

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

    for (const [index, tagText] of cardTags.tags.entries()) {
      cardTagsView.addTag(index, tagText)
    }

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
  #getViewConnectedToCardDetails(cardDetails) {
    const cardDetailsView = new CardDetailsView()

    /** @type {(index: number, detail: CardDetail) => void} */
    const addDetail = (index, detail) => {
      cardDetailsView.addDetail(index, detail.key, detail.value)
      detail.subscribe('key', () => cardDetailsView.setDetailKey(index, detail.key))
      detail.subscribe('value', () => cardDetailsView.setDetailValue(index, detail.value))
    }

    cardDetails.details.subscribe('add', ({index, item: detail}) => addDetail(index, detail))
    cardDetails.details.subscribe('remove', ({index, item: detail}) => {
      cardDetailsView.removeDetail(index)
      detail.unsubscribeAll()
    })

    for (const [index, detail] of cardDetails.details.entries()) {
      addDetail(index, detail)
    }

    return cardDetailsView
  }

  /** @param {CardDetails} cardDetails  */
  #disconnectCardDetails(cardDetails) {
    for (const [, detail] of cardDetails.details.entries()) {
      detail.unsubscribeAll()
    }
    cardDetails.details.unsubscribeAll()
  }

  /**
   * @param {CardHeading} cardHeading
   * @returns {CardHeadingView}
   */
  #getViewConnectedToCardHeading(cardHeading) {
    const cardHeadingView = new CardHeadingView(cardHeading.text, cardHeading.level, cardHeading.justification)
    cardHeading.subscribe('text', () => cardHeadingView.text = cardHeading.text)
    cardHeading.subscribe('level', () => cardHeadingView.level = cardHeading.level)
    cardHeading.subscribe('justification', () => cardHeadingView.justification = cardHeading.justification)

    return cardHeadingView
  }

  /** @param {CardHeading} cardHeading */
  #disconnectCardHeading(cardHeading) {
    cardHeading.unsubscribeAll()
  }
}