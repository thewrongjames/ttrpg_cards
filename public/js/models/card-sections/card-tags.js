import { ListenableList } from '/js/library/models/listenable-list.js'

export class CardTags {
  /** @returns {'CardTags'} */
  get sectionName() {
    return 'CardTags'
  }

  /** @type {ListenableList<string>} */
  #tags = new ListenableList()

  get tags() {
    return this.#tags
  }
}