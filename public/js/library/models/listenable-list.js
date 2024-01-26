import { Listenable } from '/js/library/models/listenable.js'

/**
 * A collection with listenable add and remove methods. Added items are keyed by numeric indices
 * returned by the add method, and may be removed by those indices.
 * @template Item
 * @extends Listenable<'add'|'remove', {index: number, item: Item}>
 */
export class ListenableList extends Listenable {
  /** @type {Record<number, Item>} */
  #items = {}
  #nextSectionIndex = 0

  /**
   * @param {number} index
   * @returns {Item|undefined}
   */
  get(index) {
    return this.#items[index]
  }
  
  /**
   * @param {Item} item
   * @returns {number}
   */
  add(item) {
    const index = this.#nextSectionIndex++
    
    this.#items[index] = item
    this._trigger('add', {index, item})

    return index
  }
  
  /** @param {number} index */
  remove(index) {
    const item = this.#items[index]
    if (item === undefined) return

    delete this.#items[index]
    this._trigger('remove', {index, item})
  }
}