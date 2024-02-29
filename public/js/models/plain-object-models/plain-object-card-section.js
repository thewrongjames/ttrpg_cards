import { getObjectOrError } from '/js/library/models/get-type-or-error.js'

import { CardText, CardTags, CardDetails } from '/js/models/card-sections/index.js'

import { getPlainObjectCardDetails0OrError } from '/js/models/plain-object-models/plain-object-card-details.js'
import { getPlainObjectCardTags0OrError } from '/js/models/plain-object-models/plain-object-card-tags.js'
import { getPlainObjectCardText0OrError } from '/js/models/plain-object-models/plain-object-card-text.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-text.js').PlainObjectCardText0} PlainObjectCardText0 */
/** @typedef {import('/js/models/plain-object-models/plain-object-card-tags.js').PlainObjectCardTags0} PlainObjectCardTags0 */
/** @typedef {import('/js/models/plain-object-models/plain-object-card-details.js').PlainObjectCardDetails0} PlainObjectCardDetails0 */

/** @typedef {PlainObjectCardText0|PlainObjectCardTags0|PlainObjectCardDetails0} PlainObjectCardSection0 */

/**
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError}
 * @returns {PlainObjectCardSection0}
 */
export function getPlainObjectCardSection0OrError(input, name) {
  const object = getObjectOrError(input, name)

  if (!('type' in object)) {
    throw new TypeError(`${name}.type does not exist`)
  }

  switch (object.type) {
    case CardText.sectionName:
      return getPlainObjectCardText0OrError(input, name)
    case CardTags.sectionName:
      return getPlainObjectCardTags0OrError(input, name)
    case CardDetails.sectionName:
      return getPlainObjectCardDetails0OrError(input, name)
    default:
      throw new TypeError(`${name} has invalid type ${object.type}`)
  }
}
