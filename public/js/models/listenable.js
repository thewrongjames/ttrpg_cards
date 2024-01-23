/**
 * @template {string} ListenedName
 * @class
 */
export class Listenable {
  /** @type {Map<ListenedName, (() => void)[]>} */
  #subscriptions = new Map()

  /**
   * @param {ListenedName} listenedName 
   * @param {() => void} listener 
   */
  subscribe(listenedName, listener) {
    const subscriptions = this.#subscriptions.get(listenedName) || []
    subscriptions.push(listener)
    this.#subscriptions.set(listenedName, subscriptions)
  }

  /**
   * @param {ListenedName} listenedName 
   */
  _trigger(listenedName) {
    // Unfortunately I can't make this private if I want the sub-classes to be
    // able to call it.
    for (const subscription of this.#subscriptions.get(listenedName) || []) {
      subscription()
    }
  }
}