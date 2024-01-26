/**
 * A base class to support classes that wish to notify subscribers.
 * @template {[name: string|number, event: object]} ListenableNameAndEvent
 */
export class Listenable {
  /** @typedef {ListenableNameAndEvent[0]} ListenableName */
  /** @typedef {(...triggerDetails: ListenableNameAndEvent) => void} Listener */

  /** @type {Map<ListenableName, Set<Listener>>} */
  #subscriptions = new Map()

  /**
   * Subscribe the given listener to be triggered on the given name.
   * @param {ListenableName} listenedName 
   * @param {(...triggerDetails: ListenableNameAndEvent) => void} listener 
   */
  subscribe(listenedName, listener) {
    const subscriptions = this.#subscriptions.get(listenedName) || new Set()
    subscriptions.add(listener)
    this.#subscriptions.set(listenedName, subscriptions)
  }

  /**
   * Unsubscribe the given listener to be triggered on the given name, if it was previously
   * subscribed.
   * @param {ListenableName} listenedName 
   * @param {Listener} listener
   * @returns {boolean} true if the listener was subscribed to the listened name (and has now been
   * removed), and false is it was not subscribed (and so has not been removed).
   */
  unsubscribe(listenedName, listener) {
    const subscriptions = this.#subscriptions.get(listenedName)
    
    // If nothing was subscribed to this name, then this listener definitely wasn't, so return
    // false.
    if (subscriptions === undefined) {
      return false
    }

    return subscriptions.delete(listener)
  }

  /**
   * Trigger all the subscriptions for the given name. The subclasses must invoke this, which is why
   * it isn't private.
   * @param {ListenableNameAndEvent} triggerDetails 
   */
  _trigger(...triggerDetails) {
    const [name] = triggerDetails

    for (const subscription of this.#subscriptions.get(name) || []) {
      subscription(...triggerDetails)
    }
  }
}