import { Listenable } from '/js/library/models/listenable.js'

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
}