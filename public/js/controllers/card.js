/** @typedef {import('/js/models/card.js').Card} Card */
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
  } 
}