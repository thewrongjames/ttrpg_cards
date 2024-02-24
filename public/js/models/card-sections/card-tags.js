import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'

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
}