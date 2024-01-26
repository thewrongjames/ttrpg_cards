import { Listenable } from '/js/library/models/listenable.js'
import { ListenableSections } from '/js/library/models/listenable-sections.js'

/** @typedef {[("name"|"type"), {}]} TriggerDetails */
/** @extends Listenable<TriggerDetails> */
export class Card extends Listenable {
  #name = ''
  #type = ''
  /** @type {ListenableSections<unknown>} */
  #sections = new ListenableSections()

  /** @param {string} newName */
  set name(newName) {
    this.#name = newName
    this._trigger('name', {})
  }
  get name() {
    return this.#name
  }

  /** @param {string} newType */
  set type(newType) {
    this.#type = newType
    this._trigger('type', {})
  }
  get type() {
    return this.#type
  }

  get sections() {
    return this.#sections
  }
}
