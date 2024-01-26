/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('/js/models/card-sections').CardSection} CardSection */
/** @typedef {import('/js/views/card/index.js').CardView} CardView */

import { CardTextView } from '/js/views/card-text/index.js'

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

    this.#card.sections.subscribe('add', ({index, section}) => {
      console.log('here')
      const view = CardController.#getSectionView(section)
      this.#cardView.addSection(index, view)
    })
    this.#card.sections.subscribe('remove', ({index, section}) => {
      section.unsubscribeAll()
      this.#cardView.removeSection(index)
    })
  }

  /**
   * @param {CardSection} section
   * @returns {HTMLElement}
   */
  static #getSectionView(section) {
    switch (section.sectionName) {
    case 'CardText': {
      const cardTextView = new CardTextView()
      section.subscribe('text', () => cardTextView.text.innerText = section.text)
      return cardTextView
    }
    }
  }
}