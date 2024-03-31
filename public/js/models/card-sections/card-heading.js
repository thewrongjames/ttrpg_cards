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

  #text = ''
  /** @type {CardHeadingLevel} */
  #level = 'title'
  /** @type {CardHeadingJustification} */
  #justification = 'centre'

  get text() {
    return this.#text
  }
  /** @param {string} newText */
  set text(newText) {
    this.#text = newText
  }

  get level() {
    return this.#level
  }
  /** @param {CardHeadingLevel} newLevel */
  set level(newLevel) {
    this.#level = newLevel
  }
  get justification() {
    return this.#justification
  }
  /** @param {CardHeadingJustification} newJustification */
  set justification(newJustification) {
    this.#justification = newJustification
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
  static getFromPlainObjectCardHeading0(plainObject) {
    const cardHeading = new CardHeading()

    cardHeading.text = plainObject.text
    cardHeading.level = plainObject.level
    cardHeading.justification = plainObject.justification

    return cardHeading
  }
}