import { getArrayOfTypeOrError } from '/js/library/models/get-type-or-error.js'
import { getPlainObjectCard0OrError } from '/js/models/plain-object-models/plain-object-card.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card').PlainObjectCard0} PlainObjectCard0 */

/** @typedef {PlainObjectCard0[]} PlainObjectCards0 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError} If the given input is not a PlainObjectCards0.
 * @returns {PlainObjectCards0}
 */
export function getPlainObjectCards0OrError(input, name) {
  return getArrayOfTypeOrError(getPlainObjectCard0OrError, input, name)
}