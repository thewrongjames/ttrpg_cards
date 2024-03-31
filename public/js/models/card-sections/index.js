import {CardText} from '/js/models/card-sections/card-text.js'
import {CardTags} from '/js/models/card-sections/card-tags.js'
import {CardDetails} from '/js/models/card-sections/card-details.js'
import { CardHeading } from '/js/models/card-sections/card-heading.js'

/** @typedef {import('/js/models/plain-object-models/plain-object-card-section.js').PlainObjectCardSection0} PlainObjectCardSection0 */

export {
  CardText,
  CardTags,
  CardDetails,
  CardHeading,
}

/** @typedef {CardText|CardTags|CardDetails|CardHeading} CardSection */

/** @typedef {CardSection['sectionName']} CardSectionName */

export const cardSections = {
  [CardText.sectionName]: CardText,
  [CardTags.sectionName]: CardTags,
  [CardDetails.sectionName]: CardDetails,
  [CardHeading.sectionName]: CardHeading,
}

/**
 * @param {PlainObjectCardSection0} plainObject
 * @returns {CardSection}
 */
export function getCardSectionFromPlainObjectCardSection0(plainObject) {
  switch (plainObject.type) {
    case 'CardText':
      return CardText.getFromPlainObjectCardText0(plainObject)
    case 'CardTags':
      return CardTags.getFromPlainObjectCardTags0(plainObject)
    case 'CardDetails':
      return CardDetails.getFromPlainObjectCardDetails0(plainObject)
    case 'CardHeading':
      return CardHeading.getFromPlainObjectCardHeading0(plainObject)
  }
}
