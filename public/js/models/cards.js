import { Listenable, allTriggers } from '/js/library/models/listenable.js'

/** @typedef {import('/js/models/card.js').Card} Card */

/** @extends Listenable<'append'|'remove'|'card-triggered', {}> */
export class Cards extends Listenable {
  // The built-in Map maintains it's insertion order when iterated over.
  /**
   * This stores the cards, and 
   * @type {Map<Card,()=>void>}
   */
  #cards = new Map()

  /** @param {Card} card */
  append(card) {
    const trigger = () => this._trigger('card-triggered', {})
    const removeSubscription = card.subscribe(allTriggers, trigger)

    this.#cards.set(card, removeSubscription)
    this._trigger('append', {})
  }

  /** @param {Card} card */
  remove(card) {
    this.#cards.delete(card)
    this._trigger('remove', {})
  }
}
