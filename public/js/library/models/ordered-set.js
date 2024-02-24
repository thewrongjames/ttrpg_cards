/*
add() performs a Map.has() (which is hopefully expected constant time) and otherwise does constant
time operations.

delete() also performs a Map.has() and otherwise should be amortised O(1) over n operations.
*/

/**
 * A, hopefully efficient, implementation of a set that allows you to retrieve the items in the
 * order that they were inserted.
 * @template T
 */
export class OrderedSet {
  /** @type {(T)[]} */
  #elements = []
  /** @type {Map<T, number>} */
  #elementIndices = new Map()

  /** @param {Iterable<T>} iterable  */
  constructor(iterable) {
    const elements = Array.from(iterable)
    this.#elements = elements
    this.#elementIndices = new Map(elements.map((element, index) => [element, index]))
  }

  /**
   * Add the given element to the set if it is not already in there. If it is already in there, do
   * nothing. Note that this means that an element e is ordered based on the first time add(e) is
   * called, and subsequent calls of add(e) do nothing.
   * @param {T} element
   */
  add(element) {
    if (this.#elementIndices.has(element)) {
      return
    }

    const index = this.#elements.push(element) - 1
    this.#elementIndices.set(element, index)
  }

  /**
   * Delete the given element from the set if it is in the set, and do nothing if it is not.
   * @param {T} element
   */
  delete(element) {
    const index = this.#elementIndices.get(element)
    if (index === undefined) {
      return
    }

    delete this.#elements[index]
    this.#elementIndices.delete(element)

    if (this.#elements.length >= 2 * this.#elementIndices.size) {
      // Once we accumulate too many empty slots, remove them. Note that Array.filter doesn't visit
      // empty slots.
      const elements = this.#elements.filter(() => true)
      this.#elements = elements
      this.#elementIndices = new Map(elements.map((element, index) => [element, index]))
    }
  }
}