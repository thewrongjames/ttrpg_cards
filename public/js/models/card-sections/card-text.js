import { Listenable } from '/js/library/models/listenable.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-text.js').PlainObjectCardText0} PlainObjectCardText0 */

/** @extends Listenable<'text', {}> */
export class CardText extends Listenable {
  static sectionName = /** @type {const} */('CardText')
  get sectionName() {
    return CardText.sectionName
  }

  #text = ''

  get text() {
    return this.#text
  }
  /** @param {string} newText */
  set text(newText) {
    this.#text = newText
    this._trigger('text', {})
  }

  /** @returns {PlainObjectCardText0} */
  toPlainObject() {
    return {
      type: CardText.sectionName,
      text: this.#text,
    }
  }

  /**
   * @param {PlainObjectCardText0} plainObject
   * @returns {CardText}
   */
  static getFromPlainObjectCardText0(plainObject) {
    const cardText = new CardText()
    cardText.text = plainObject.text
    return cardText
  }
}