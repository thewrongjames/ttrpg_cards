import { getObjectOrError, getStringOrError } from '/js/library/models/get-type-or-error.js'

import { CardText } from '/js/models/card-sections/index.js'

/**
 * @typedef {object} PlainObjectCardText0
 * @property {CardText['sectionName']} type
 * @property {string} text
 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCardText0}
 */
export function getPlainObjectCardText0OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('type' in object)) {
    throw new TypeError(`${name}.type does not exist`)
  }
  if (!('text' in object)) {
    throw new TypeError(`${name}.text does not exist`)
  }

  if (object.type !== CardText.sectionName) {
    throw new TypeError(`${name}.type does not equal ${CardText.sectionName}`)
  }

  return {
    type: object.type,
    text: getStringOrError(object.text, `${name}.text`),
  }
}
