import { ListenableList } from '/js/library/models/listenable-list.js'

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
}