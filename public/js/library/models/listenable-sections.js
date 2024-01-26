import { Listenable } from '/js/library/models/listenable.js'

/**
 * A collection with listenable add and remove methods. Added items are keyed by numeric indices
 * returned by the add method, and may be removed by those indices.
 * @template Element
 * @extends Listenable<'add'|'remove', {index: number, section: Element}>
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
    this._trigger('add', {index, section})

    return index
  }
  
  /** @param {number} index */
  remove(index) {
    const section = this.#sections[index]
    if (section === undefined) return

    delete this.#sections[index]
    this._trigger('remove', {index, section})
  }
}