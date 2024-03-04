import { CardDetail, CardDetails } from '/js/models/card-sections/card-details.js'
import { CardTags } from '/js/models/card-sections/card-tags.js'
import { CardText } from '/js/models/card-sections/card-text.js'
import { Card } from '/js/models/card.js'
import { Cards } from '/js/models/cards.js'

/** @returns {Card} */
export function makeStartingCard() {
  const card = new Card()

  card.name = 'Message'
  card.type = 'Cantrip 1'

  const tagsSection = new CardTags()
  card.sections.add(tagsSection)
  for (const tag of ['Auditory', 'Cantrip', 'Illusion', 'Linguistic', 'Mental']) {
    tagsSection.tags.add(tag)
  }

  const propertiesSection = new CardDetails()
  card.sections.add(propertiesSection)
  
  const castProperty = new CardDetail()
  propertiesSection.details.add(castProperty)
  castProperty.key = 'Cast'
  castProperty.value = '1 action, verbal'

  const rangeProperty = new CardDetail()
  propertiesSection.details.add(rangeProperty)
  rangeProperty.key = 'Range'
  rangeProperty.value = '120 feet'

  const targetsProperty = new CardDetail()
  propertiesSection.details.add(targetsProperty)
  targetsProperty.key = 'Targets'
  targetsProperty.value = '1 creature'

  const descriptionSection = new CardText()
  card.sections.add(descriptionSection)
  descriptionSection.text = 'You mouth words quietly, but instead of coming out of your mouth, they\'re transferred directly to the ears of the target. While others can\'t hear your words any better than if you normally mouthed them, the target can hear your words as if they were standing next to you. The target can give a brief response as a reaction, or as a free action on their next turn if they wish, but they must be able to see you and be within range to do so. If they respond, their response is delivered directly to your ear, just like the original message.'

  const heighteningSection = new CardDetails()
  card.sections.add(heighteningSection)
  const heighteningToThird = new CardDetail()
  heighteningSection.details.add(heighteningToThird)
  heighteningToThird.key = 'Heightened (3rd)'
  heighteningToThird.value = 'The spell\'s range increases to 500 feet.'

  return card
}

/**
 * Create the default initial cards model. A kind of demonstration of what cards can look like for
 * new users.
 * @returns {Cards}
 */
export function makeStartingCards() {
  const card = makeStartingCard()

  const cards = new Cards()
  cards.append(card)

  return cards
}