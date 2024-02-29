import { getArrayOfTypeOrError, getArrayOrError, getObjectOrError, getStringOrError } from '/js/library/models/get-type-or-error.js'

import { CardDetails } from '/js/models/card-sections/card-details.js'

/** @typedef {[string, string]} PlainObjectCardDetail0 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCardDetail0}
 */
function getPlainObjectCardDetail0OrError(input, name) {
  const array = getArrayOrError(input, name)

  const [key, value] = array

  return [getStringOrError(key, `${name}[0]`), getStringOrError(value, `${name}[1]`)]
}

/**
 * @typedef {object} PlainObjectCardDetails0
 * @property {CardDetails['sectionName']} type
 * @property {PlainObjectCardDetail0[]} details
 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCardDetails0}
 */
export function getPlainObjectCardDetails0OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('type' in object)) {
    throw new TypeError(`${name}.type does not exist`)
  }
  if (!('details' in object)) {
    throw new TypeError(`${name}.details does not exist`)
  }

  if (object.type !== CardDetails.sectionName) {
    throw new TypeError(`${name}.type does not equal ${CardDetails.sectionName}`)
  }

  return {
    type: object.type,
    details: getArrayOfTypeOrError(getPlainObjectCardDetail0OrError, object.details, `${name}.details`),
  }
}
