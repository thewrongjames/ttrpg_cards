import { SerialisationError } from '/js/library/errors/serialisation-error.js'
import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { getSerialisationWrapperOrError } from '/js/library/models/serialisation-wrapper.js'

import { getPlainObjectCards0OrError } from '/js/models/plain-object-models/plain-object-cards.js'
import { Card } from '/js/models/card.js'

/**
 * @template [C=unknown]
 * @typedef {import('/js/library/models/serialisation-wrapper.js').SerialisationWrapper<C>} SerialisationWrapper
 */

/** @typedef {import('/js/models/plain-object-models/plain-object-cards').PlainObjectCards0} PlainObjectCards0 */

/**
 * @callback PlainObjectConverter
 * @param {unknown} input
 * @param {string} name
 * @returns {Cards}
 * @throws {TypeError}
 */

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

  /** @returns {PlainObjectCards0} */
  toPlainObject() {
    // Note that Map.keys() returns the keys in insertion order, so we don't lose our order.
    return Array.from(this.#cards.keys()).map(card => card.toPlainObject())
  }

  /** @type {PlainObjectConverter} */
  static getFromPlainObjectCards0OrError(input, name) {
    const plainObject = getPlainObjectCards0OrError(input, name)

    const cards = new Cards()

    for (const plainObjectCard0 of plainObject) {
      const card = Card.getFromPlainObjectCard0(plainObjectCard0)
      cards.append(card)
    }

    return cards
  }

  /** @type {Map<unknown, PlainObjectConverter>} */
  static #plainObjectConverters = new Map([
    [0, Cards.getFromPlainObjectCards0OrError],
  ])

  /**
   * @returns {string}
   * @throws {SerialisationError}
   */
  serialise() {
    /** @type {SerialisationWrapper<PlainObjectCards0>} */
    const serialisationWrapper = {version: 0, content: this.toPlainObject()}
    
    /** @type {string} */
    let json
    try {
      json = JSON.stringify(serialisationWrapper)
    } catch (cause) {
      throw new SerialisationError(
        'failed to convert plain object cards representation to JSON',
        {cause},
      )
    }

    return json
  }

  /**
 * @param {string} serialised
 * @returns {Cards}
 * @throws {SerialisationError}
 */
  static deserialise(serialised) {
    /** @type {unknown} */
    let parsedJSON
    try {
      parsedJSON = JSON.parse(serialised)
    } catch (cause) {
      throw new SerialisationError('failed to parse JSON', {cause})
    }

    /** @type {SerialisationWrapper} */
    let serialisationWrapper
    try {
      serialisationWrapper = getSerialisationWrapperOrError(parsedJSON, 'parsedJSON')
    } catch (cause) {
      throw new SerialisationError('parsed JSON was not of the expected wrapper structure', {cause})
    }

    const plainObjectConverter = Cards.#plainObjectConverters.get(serialisationWrapper.version)
    if (plainObjectConverter === undefined) {
      throw new SerialisationError(`unknown version "${serialisationWrapper.version}"`)
    }

    try {
      return plainObjectConverter(serialisationWrapper.content, 'serilaisationWrapper.content')
    } catch (cause) {
      throw new SerialisationError(
        `serialised data was of an invalid structure for version ${serialisationWrapper.version}`,
        {cause}
      )
    }
  }
}
