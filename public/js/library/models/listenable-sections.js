import { Listenable } from '/js/library/models/listenable.js'

/** @typedef {[("add"|"remove"), {index: number}]} TriggerDetails */

/**
 * A collection with listenable add and remove methods. Added items are keyed by numeric indices
 * returned by the add method, and may be removed by those indices.
 * @template Element
 * @extends Listenable<TriggerDetails>
 */
export class ListenableSections extends Listenable {
  /** @type {Record<number, Element>} */
  #sections = {}
  #nextSectionIndex = 0

  /**
   * @param {number} index
   * @returns {Element|undefined}
   */
  get(index) {
    return this.#sections[index]
  }
  
  /**
   * @param {Element} section
   * @returns {number}
   */
  add(section) {
    const index = this.#nextSectionIndex++
    
    this.#sections[index] = section
    this._trigger('add', {index})

    return index
  }
  
  /** @param {number} index */
  remove(index) {
    delete this.#sections[index]
    this._trigger('remove', {index})
  }
}