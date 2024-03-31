import { getArrayOfTypeOrError } from '/js/library/models/get-type-or-error.js'
import { getPlainObjectCard0OrError, getPlainObjectCard1OrError } from '/js/models/plain-object-models/plain-object-card.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card').PlainObjectCard0} PlainObjectCard0 */
/** @typedef {import('/js/models/plain-object-models/plain-object-card').PlainObjectCard1} PlainObjectCard1 */

/** @typedef {PlainObjectCard0[]} PlainObjectCards0 */
/** @typedef {PlainObjectCard1[]} PlainObjectCards1 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError} If the given input is not a PlainObjectCards0.
 * @returns {PlainObjectCards0}
 */
export function getPlainObjectCards0OrError(input, name) {
  return getArrayOfTypeOrError(getPlainObjectCard0OrError, input, name)
}

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError} If the given input is not a PlainObjectCards0.
 * @returns {PlainObjectCards1}
 */
export function getPlainObjectCards1OrError(input, name) {
  return getArrayOfTypeOrError(getPlainObjectCard1OrError, input, name)
}
