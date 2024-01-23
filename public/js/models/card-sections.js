/** @typedef {object} CardSection */

/** @implements {CardSection} */
export class CardTags {
  #tags

  /** @param {string[]} tags */
  constructor(tags) {
    this.#tags = tags
  }
}

/** @implements {CardSection} */
export class CardDetails {
  #details

  /** @param {[string, string][]} details */
  constructor(details) {
    this.#details = details
  }
}

/** @implements {CardSection} */
export class CardText {
  #text

  /** @param {string} text */
  constructor(text) {
    this.#text = text
  }
}