import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-details.js').PlainObjectCardDetails0} PlainObjectCardDetails0 */

/** @extends Listenable<'key'|'value', {}> */
export class CardDetail extends Listenable {
  #key = ''
  #value = ''

  /** @param {string} newKey  */
  set key(newKey) {
    this.#key = newKey
    this._trigger('key', {})
  }
  get key() {
    return this.#key
  }
  

  /** @param {string} newValue  */
  set value(newValue) {
    this.#value = newValue
    this._trigger('value', {})
  }
  get value() {
    return this.#value
  }
}

/** @extends {Listenable<'details-triggered', {}>} */
export class CardDetails extends Listenable {
  static sectionName = /** @type {const} */('CardDetails')
  get sectionName() {
    return CardDetails.sectionName
  }

  /** @type {ListenableList<CardDetail>} */
  #details = new ListenableList()

  constructor() {
    super()

    this.#details.subscribe(allTriggers, () => this._trigger('details-triggered', {}))
  }

  get details() {
    return this.#details
  }

  /** @returns {PlainObjectCardDetails0} */
  toPlainObject() {
    return {
      type: CardDetails.sectionName,
      details: Array.from(this.#details.entries()).map(([, detail]) => [detail.key, detail.value]),
    }
  }

  /**
   * @param {PlainObjectCardDetails0} plainObject
   * @returns {CardDetails}
   */
  static getFromPlainObjectCardDetails0(plainObject) {
    const cardDetails = new CardDetails()

    for (const [key, value] of plainObject.details) {
      const cardDetail = new CardDetail()
      cardDetail.key = key
      cardDetail.value = value
      cardDetails.details.add(cardDetail)
    }

    return cardDetails
  }
}
