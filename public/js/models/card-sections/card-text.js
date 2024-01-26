import { Listenable } from '/js/library/models/listenable.js'

/** @extends Listenable<'text', {}> */
export class CardText extends Listenable {
  /** @returns {'CardText'} */
  get sectionName() {
    return 'CardText'
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