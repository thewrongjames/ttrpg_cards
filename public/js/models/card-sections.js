import { Listenable } from '/js/library/models/listenable.js'

/** @typedef {CardText} CardSection */

export class CardTags {
  #tags

  /** @param {string[]} tags */
  constructor(tags) {
    this.#tags = tags
  }
}

export class CardDetails {
  #details

  /** @param {[string, string][]} details */
  constructor(details) {
    this.#details = details
  }
}

/** @extends Listenable<'text', {}> */
export class CardText extends Listenable {
  #text = ''

  get text() {
    return this.#text
  }
  /** @param {string} newText */
  set text(newText) {
    this.#text = newText
    this._trigger('text', {})
  }

  /** @returns {'CardText'} */
  get sectionName() {
    return 'CardText'
  }
}