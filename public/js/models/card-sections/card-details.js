import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'

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
}
