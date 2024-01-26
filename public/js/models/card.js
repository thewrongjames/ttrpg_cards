import { Listenable } from '/js/library/models/listenable.js'
import { ListenableSections } from '/js/library/models/listenable-sections.js'

/** @typedef {import('/js/models/card-sections.js').CardSection} CardSection */

/** @extends Listenable<'name'|'type', {}> */
export class Card extends Listenable {
  #name = ''
  #type = ''
  /** @type {ListenableSections<CardSection>} */
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
