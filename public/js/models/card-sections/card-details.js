import { Listenable } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'

/** @typedef {import('/js/library/models/listenable.js').UnsubscribeAllAble} UnsubscribeAllAble */

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

/** @implements {UnsubscribeAllAble} */
export class CardDetails {
  static sectionName = /** @type {const} */('CardDetails')
  get sectionName() {
    return CardDetails.sectionName
  }

  /** @type {ListenableList<CardDetail>} */
  #details = new ListenableList()

  get details() {
    return this.#details
  }

  unsubscribeAll() {
    this.#details.unsubscribeAll()
  }
}
