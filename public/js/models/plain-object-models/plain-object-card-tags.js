import { getArrayOfTypeOrError, getObjectOrError, getStringOrError } from '/js/library/models/get-type-or-error.js'

import { CardTags } from '/js/models/card-sections/card-tags.js'

/**
 * @typedef {object} PlainObjectCardTags0
 * @property {CardTags['sectionName']} type
 * @property {string[]} tags
 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCardTags0}
 */
export function getPlainObjectCardTags0OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('type' in object)) {
    throw new TypeError(`${name}.type does not exist`)
  }
  if (!('tags' in object)) {
    throw new TypeError(`${name}.tags does not exist`)
  }

  if (object.type !== CardTags.sectionName) {
    throw new TypeError(`${name}.type does not equal ${CardTags.sectionName}`)
  }

  return {
    type: object.type,
    tags: getArrayOfTypeOrError(getStringOrError, object.tags, `${name}.tags`),
  }
}