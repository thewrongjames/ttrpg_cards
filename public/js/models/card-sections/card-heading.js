import { Listenable } from '/js/library/models/listenable.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-heading.js').PlainObjectCardHeading0} PlainObjectCardHeading0 */

/** @typedef {'title'|'subtitle'} CardHeadingLevel */
/** @typedef {'left'|'centre'|'right'} CardHeadingJustification */

/** @extends Listenable<'text'|'level'|'justification', {}> */
export class CardHeading extends Listenable {
  static sectionName = /** @type {const} */('CardHeading')
  get sectionName() {
    return CardHeading.sectionName
  }

  #text
  #level
  #justification

  /**
   * @param {string} text 
   * @param {CardHeadingLevel} level 
   * @param {CardHeadingJustification} justification 
   */
  constructor(text='', level='title', justification='centre') {
    super()

    this.#text = text
    this.#level = level
    this.#justification = justification
  }

  get text() {
    return this.#text
  }
  /** @param {string} newText */
  set text(newText) {
    this.#text = newText
    this._trigger('text', {})
  }

  get level() {
    return this.#level
  }
  /** @param {CardHeadingLevel} newLevel */
  set level(newLevel) {
    this.#level = newLevel
    this._trigger('level', {})
  }

  get justification() {
    return this.#justification
  }
  /** @param {CardHeadingJustification} newJustification */
  set justification(newJustification) {
    this.#justification = newJustification
    this._trigger('justification', {})
  }

  /** @returns {PlainObjectCardHeading0} */
  toPlainObject() {
    return {
      type: CardHeading.sectionName,
      text: this.#text,
      level: this.#level,
      justification: this.#justification,
    }
  }

  /**
   * @param {PlainObjectCardHeading0} plainObject 
   * @returns {CardHeading}
   */
  static getFromPlainObjectCardHeading0({text, level, justification}) {
    return new CardHeading(text, level, justification)
  }
}