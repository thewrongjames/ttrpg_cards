import { IndexError } from '/js/library/errors/index-error.js'

import { Listenable } from '/js/library/models/listenable.js'

/** @typedef {import('/js/models/card.js').Card} Card */

/** @extends Listenable<'append'|'remove', {index: number, card: Card}> */
export class Cards extends Listenable {
  /** @type {Card[]} */
  #cards = []

  /**
   * @param {Card} card
   * @returns {number} The index of the newly added card.
   */
  append(card) {
    const index = this.#cards.push(card) - 1
    this._trigger('append', {index, card})
    return index
  }

  /**
   * @param {number} index
   * @throws {IndexError} If there is no card at the given index.
   */
  remove(index) {
    const card = this.#cards[index]
    if (card === undefined) {
      throw new IndexError(`no card at index ${index}`)
    }

    this.#cards.splice(index, 1)
    this._trigger('remove', {index, card})
  }

  /**
   * @param {number} index
   * @returns {Card|undefined}
   */
  get(index) {
    return this.#cards[index]
  }
}
