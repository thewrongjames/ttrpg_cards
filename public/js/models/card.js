import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'
import { getCardSectionFromPlainObjectCardSection0 } from '/js/models/card-sections/index.js'

/** @typedef {import('/js/models/card-sections/index.js').CardSection} CardSection */
/** @typedef {import('/js/models/plain-object-models/plain-object-card').PlainObjectCard0} PlainObjectCard0 */

/** @extends Listenable<'name'|'type'|'sections-triggered', {}> */
export class Card extends Listenable {
  #name = ''
  #type = ''
  /** @type {ListenableList<CardSection>} */
  #sections = new ListenableList()

  constructor() {
    super()

    this.#sections.subscribe(allTriggers, () => this._trigger('sections-triggered', {}))
  }

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

  /** @returns {PlainObjectCard0} */
  toPlainObject() {
    return {
      name: this.#name,
      type: this.#type,
      sections: Array.from(this.#sections.entries()).map(([, section]) => section.toPlainObject()),
    }
  }

  /**
   * @param {PlainObjectCard0} plainObject
   * @returns {Card}
   */
  static getFromPlainObjectCard0(plainObject) {
    const card = new Card()

    card.name = plainObject.name
    card.type = plainObject.type

    for (const section of plainObject.sections) {
      card.sections.add(getCardSectionFromPlainObjectCardSection0(section))
    }

    return card
  }
}
