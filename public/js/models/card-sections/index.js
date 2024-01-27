import {CardText} from '/js/models/card-sections/card-text.js'
import {CardTags} from '/js/models/card-sections/card-tags.js'
import {CardDetails} from '/js/models/card-sections/card-details.js'

export {
  CardText,
  CardTags,
  CardDetails,
}

/** @typedef {CardText|CardTags|CardDetails} CardSection */

/** @typedef {CardSection['sectionName']} CardSectionName */

export const CardSections = {
  [CardText.sectionName]: CardText,
  [CardTags.sectionName]: CardTags,
  [CardDetails.sectionName]: CardDetails,
}