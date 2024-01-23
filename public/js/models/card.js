import { Listenable } from '/js/models/listenable.js'

/** @typedef {import("/js/models/card-sections.js").CardSection} CardSection */

/**
 * @class
 * @extends Listenable<"name"|"type">
 */
export class Card extends Listenable {
  #name = ''
  #type = ''

  /** @type {Record<number, CardSection>} */
  #sections = {}
  #nextSectionIndex = 0

  /** @param {string} newName */
  set name(newName) {
    this.#name = newName
    this._trigger('name')
  }
  get name() {
    return this.#name
  }

  /** @param {string} newType */
  set type(newType) {
    this.#type = newType
    this._trigger('type')
  }
  get type() {
    return this.#type
  }

  get sections() {
    // Destructure so that mutating this object doesn't mutate the private
    // value.
    return {...this.#sections}
  }

  /** @param {CardSection} newSection */
  addSection(newSection) {
    this.#sections[this.#nextSectionIndex++] = newSection
  }

  /** @param {number} sectionIndex */
  removeSection(sectionIndex) {
    delete this.#sections[sectionIndex]
  }
}
