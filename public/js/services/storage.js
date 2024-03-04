import { makeStartingCards } from '/js/data/starting-cards.js'
import { Cards } from '/js/models/cards.js'

const CARDS_STORAGE_KEY = 'cards'

/**
 * Save a serialised version of the given cards object to local storage. Note that this will
 * overwrite any previously saved cards.
 * @param {Cards} cards
 * @throws {DOMException} If local storage is full.
 */
export function saveCardsToStorage(cards) {
  const serialisedCards = cards.serialise()
  localStorage.setItem(CARDS_STORAGE_KEY, serialisedCards)
}

/**
 * Load a cards model from whatever is stored in local storage. If there is no cards model stored in
 * local storage, or the stored model is invalid, it instead loads the starting cards model. If the
 * stored model is invalid, it will be re-saved at a different storage key for debugging. This
 * function produces logs as a side effect.
 * @returns {Cards}
 */
export function loadCardsFromStorage() {
  const serialisedCards = localStorage.getItem(CARDS_STORAGE_KEY)
  if (serialisedCards === null) {
    console.info('no cards found in local storage, falling back to starting cards')
    return makeStartingCards()
  }

  try {
    return Cards.deserialise(serialisedCards)
  } catch (error) {
    console.error('failed to deserialise cards')
    console.error(error)
  }

  try {
    const key = `${CARDS_STORAGE_KEY}_${Date.now()}`
    localStorage.setItem(key, serialisedCards)
    console.info(`saved invalidly serialised cards to local storage key ${key}`)
  } catch (error) {
    console.error('error whilst trying to backup invalidly serialised cards')
    console.error(error)
  }

  return makeStartingCards()
}

export function clearCardsFromLocalStorage() {
  localStorage.removeItem(CARDS_STORAGE_KEY)
}
