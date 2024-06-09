import { getArrayOfTypeOrError, getObjectOrError, getStringOrError } from '/js/library/models/get-type-or-error.js'
import { getPlainObjectCardSection0OrError } from '/js/models/plain-object-models/plain-object-card-section.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-section.js').PlainObjectCardSection0} PlainObjectCardSection0 */

/**
 * @typedef {object} PlainObjectCard0
 * @property {string} name
 * @property {string} type
 * @property {(PlainObjectCardSection0)[]} sections
 */

/**
 * @typedef {object} PlainObjectCard1
 * @property {(PlainObjectCardSection0)[]} frontSections
 * @property {(PlainObjectCardSection0)[]} backSections
 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCard0}
 */
export function getPlainObjectCard0OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('name' in object)) {
    throw new TypeError(`${name}.name does not exist`)
  }
  if (!('type' in object)) {
    throw new TypeError(`${name}.type does not exist`)
  }
  if (!('sections' in object)) {
    throw new TypeError(`${name}.sections does not exist`)
  }

  return {
    name: getStringOrError(object.name, `${name}.name`),
    type: getStringOrError(object.type, `${name}.type`),
    sections: getArrayOfTypeOrError(getPlainObjectCardSection0OrError, object.sections, `${name}.sections`),
  }
}

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCard1}
 */
export function getPlainObjectCard1OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('frontSections' in object)) {
    throw new TypeError(`${name}.frontSections does not exist`)
  }
  if (!('backSections' in object)) {
    throw new TypeError(`${name}.backSections does not exist`)
  }

  return {
    frontSections: getArrayOfTypeOrError(getPlainObjectCardSection0OrError, object.frontSections, `${name}.frontSections`),
    backSections: getArrayOfTypeOrError(getPlainObjectCardSection0OrError, object.backSections, `${name}.backSections`),
  }
}
