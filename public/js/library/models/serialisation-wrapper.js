import { getObjectOrError } from '/js/library/models/get-type-or-error.js'

/**
 * @template [C=unknown]
 * @typedef {object} SerialisationWrapper
 * @property {unknown} version
 * @property {C} content
 */

/**
 * @param {unknown} input
 * @param {string} name
 * @returns {SerialisationWrapper}
 * @throws {TypeError} If the  given input is not a SerialisationWrapper.
 */
export function getSerialisationWrapperOrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('version' in object)) {
    throw new TypeError(`${name}.version does not exist`)
  }
  if (!('content' in object)) {
    throw new TypeError(`${name}.content does not exist`)
  }

  return {
    version: object.version,
    content: object.content,
  }
}