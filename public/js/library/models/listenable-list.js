import { Listenable, allTriggers } from '/js/library/models/listenable.js'

/**
 * A collection with listenable add and remove methods. Added items are keyed by numeric indices
 * returned by the add method, and may be removed by those indices. If the added items are
 * themselves listenable, triggers on the added items will also trigger 'itemTriggered' on the\
 * ListenableList.
 * @template Item
 * @extends Listenable<'add'|'remove'|'item-triggered', {index: number, item: Item}>
 */
export class ListenableList extends Listenable {
  /** @typedef {{item: Item, removeSubscription: (() => void)|undefined}} ItemBundle */

  /** @type {Map<number, ItemBundle>} */
  #items = new Map()
  #nextSectionIndex = 0

  /**
   * @param {number} index
   * @returns {Item|undefined}
   */
  get(index) {
    return this.#items.get(index)?.item
  }
  
  /**
   * @param {Item} item
   * @returns {number}
   */
  add(item) {
    const index = this.#nextSectionIndex++
    
    /** @type {(() => void)|undefined} */
    let removeSubscription = undefined
    if (item instanceof Listenable) {
      const trigger = () => this._trigger('item-triggered', {index, item})
      removeSubscription = item.subscribe(allTriggers, trigger)
    }

    this.#items.set(index, {item, removeSubscription})
    this._trigger('add', {index, item})

    return index
  }
  
  /** @param {number} index */
  remove(index) {
    const itemBundle = this.#items.get(index)
    if (itemBundle === undefined) return
    const {item, removeSubscription} = itemBundle

    removeSubscription?.()

    this.#items.delete(index)
    this._trigger('remove', {index, item})
  }

  /**
   * Get an iterable of the (index, Item) pairs, in listenable list, in the order that they were
   * inserted.
   * @returns {Iterable<[number, Item]>}
   */
  entries() {
    /**
     * @param {Map<number, ItemBundle>} items
     * @returns {Generator<[number, Item]>}
     */
    function* makeIterator(items) {
      for (const [index, {item}] of items) {
        yield [index, item]
      }
    }

    return makeIterator(this.#items)
  }

  /**
   * Get an iterable of the every Item in the listenable list, in the order that they were inserted.
   * @returns {Iterable<Item>}
   */
  values() {
    /**
     * @param {Map<number, ItemBundle>} items
     * @returns {Generator<Item>}
     */
    function* makeIterator(items) {
      for (const itemBundle of items.values()) {
        yield itemBundle.item
      }
    }

    return makeIterator(this.#items)
  }
}