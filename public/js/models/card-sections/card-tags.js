import { ListenableList } from '/js/library/models/listenable-list.js'

/** @typedef {import('/js/library/models/listenable.js').UnsubscribeAllAble} UnsubscribeAllAble */

/** @implements {UnsubscribeAllAble} */
export class CardTags {
  static sectionName = /** @type {const} */('CardTags')
  get sectionName() {
    return CardTags.sectionName
  }

  /** @type {ListenableList<string>} */
  #tags = new ListenableList()

  get tags() {
    return this.#tags
  }

  unsubscribeAll() {
    this.#tags.unsubscribeAll()
  }
}