import { getElementOfArrayOrError, getObjectOrError, getStringOrError } from '/js/library/models/get-type-or-error.js'

import { CardHeading } from '/js/models/card-sections/card-heading.js'

/**
 * @typedef {object} PlainObjectCardHeading0
 * @property {CardHeading['sectionName']} type
 * @property {string} text
 * @property {'title'|'subtitle'} level
 * @property {'left'|'centre'|'right'} justification
 */

/**
 * @param {unknown} input 
 * @param {string} name 
 * @throws {TypeError}
 * @returns {PlainObjectCardHeading0}
 */
export function getPlainObjectCardHeading0OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('type' in object)) {
    throw new TypeError(`${name}.type does not exist`)
  }
  if (!('text' in object)) {
    throw new TypeError(`${name}.text does not exist`)
  }
  if (!('level' in object)) {
    throw new TypeError(`${name}.level does not exist`)
  }
  if (!('justification' in object)) {
    throw new TypeError(`${name}.justification does not exist`)
  }

  if (object.type !== CardHeading.sectionName) {
    throw new TypeError(`${name}.type does not equal ${CardHeading.sectionName}`)
  }

  return {
    type: object.type,
    text: getStringOrError(object.text, `${name}.text`),
    level: getElementOfArrayOrError(object.level, `${name}.level`, ['title', 'subtitle']),
    justification: getElementOfArrayOrError(object.level, `${name}.justification`, ['left', 'centre', 'right']),
  }
}
