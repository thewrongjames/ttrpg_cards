export const allTriggers = Symbol('all-changes')

/**
 * A base class to support classes that wish to notify subscribers.
 * @template {string} TriggerableName
 * @template {object} Event
 */
export class Listenable {
  /** @typedef {(event: Event) => void} Listener */
  /** @typedef {TriggerableName|typeof allTriggers} SubscribableName */

  /** @type {Map<SubscribableName, Set<Listener>>} */
  #subscriptions = new Map()

  /**
   * Subscribe the given listener to be triggered on the given name.
   * @param {SubscribableName} listenedName 
   * @param {Listener} listener
   * @returns {() => void} A function that unsubscribes the given listener from the given
   * listenedName.
   */
  subscribe(listenedName, listener) {
    const subscriptions = this.#subscriptions.get(listenedName) || new Set()
    subscriptions.add(listener)
    this.#subscriptions.set(listenedName, subscriptions)

    return () => this.unsubscribe(listenedName, listener)
  }

  /**
   * Unsubscribe the given listener to be triggered on the given name, if it was previously
   * subscribed.
   * @param {SubscribableName} listenedName 
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

  unsubscribeAll() {
    this.#subscriptions.clear()
  }

  /**
   * Trigger all the subscriptions for the given name, and subscriptions to "allTriggers".
   * The subclasses must invoke this, which is why it isn't private.
   * @param {TriggerableName} name 
   * @param {Event} event 
   */
  _trigger(name, event) {
    for (const subscription of this.#subscriptions.get(name) || []) {
      subscription(event)
    }
    for (const subscription of this.#subscriptions.get(allTriggers) || []) {
      subscription(event)
    }
  }
}