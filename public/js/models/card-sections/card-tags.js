import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-tags.js').PlainObjectCardTags0} PlainObjectCardTags0 */

/** @extends {Listenable<'tags-triggered', {}>} */
export class CardTags extends Listenable {
  static sectionName = /** @type {const} */('CardTags')
  get sectionName() {
    return CardTags.sectionName
  }

  /** @type {ListenableList<string>} */
  #tags = new ListenableList()

  constructor() {
    super()

    this.#tags.subscribe(allTriggers, () => this._trigger('tags-triggered', {}))
  }

  get tags() {
    return this.#tags
  }

  /** @returns {PlainObjectCardTags0} */
  toPlainObject() {
    return {
      type: CardTags.sectionName,
      tags: Array.from(this.#tags.values()),
    }
  }

  /**
   * @param {PlainObjectCardTags0} plainObject
   * @returns {CardTags}
   */
  static getFromPlainObjectCardTags0(plainObject) {
    const cardTags = new CardTags()

    for (const tag of plainObject.tags) {
      cardTags.tags.add(tag)
    }

    return cardTags
  }
}
