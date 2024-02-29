import { allTriggers } from '/js/library/models/listenable.js'

import { Card } from '/js/models/card.js'
import { CardText, CardTags, CardDetails } from '/js/models/card-sections/index.js'
import { CardDetail } from '/js/models/card-sections/card-details.js'
import { Cards } from '/js/models/cards.js'

import { CardView } from '/js/views/card/index.js'

import { CardController } from '/js/controllers/card.js'
import { EditorController } from '/js/controllers/editor.js'

/** @typedef {import('/js/views/cards-controls/index.js').CardsControlsView} CardsControlsView */
/** @typedef {import('/js/views/card-editor/index.js').CardEditorView} CardEditorView */
/** @typedef {import('/js/views/pages/index.js').PagesView} PagesView */

/** @returns {Card} */
function makeMessageCard() {
  const card = new Card()

  card.name = 'Message'
  card.type = 'Cantrip 1'

  const tagsSection = new CardTags()
  card.sections.add(tagsSection)
  ;['Auditory', 'Cantrip', 'Illusion', 'Linguistic', 'Mental']
    .forEach(tag => tagsSection.tags.add(tag))

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

export class CardsController {
  #cardsControlsView
  #pagesView
  #editorController

  /** @type {CardController|undefined} */
  #selectedCardController

  #cards = new Cards()

  /**
   * @param {CardsControlsView} cardsControlsView
   * @param {CardEditorView} cardEditorView
   * @param {PagesView} pagesView
   */
  constructor(cardsControlsView, cardEditorView, pagesView) {
    this.#cards.subscribe(allTriggers, () => console.log(this.#cards.toPlainObject()))

    this.#cardsControlsView = cardsControlsView
    this.#pagesView = pagesView

    this.#cardsControlsView.onPrintClicked = () => print()
    this.#cardsControlsView.onAddCardClicked = () => this.#addCard(new Card(), true)

    this.#editorController = new EditorController(cardEditorView)
    
    // TODO: Don't create an example card.
    const card = makeMessageCard()
    this.#addCard(card, true)

  }

  /**
   * @param {Card} card
   * @param {boolean} selectCard
   */
  #addCard(card, selectCard) {
    this.#cards.append(card)
    const cardView = new CardView()
    const cardController = new CardController(card, cardView)

    this.#pagesView.addCard(cardView)
    cardView.onClick = () => this.#selectCardController(cardController)
    
    if (selectCard) {
      this.#selectCardController(cardController)
    }

  }

  /** @param {CardController} cardController */
  #selectCardController(cardController) {
    if (this.#selectedCardController !== undefined) {
      this.#selectedCardController.cardView.selected = false
    }
    this.#selectedCardController = cardController

    this.#selectedCardController.cardView.selected = true

    const removeCard = () => {
      this.#cards.remove(cardController.card)
      this.#editorController.connect(undefined, undefined)
      this.#selectedCardController = undefined
      this.#pagesView.removeCard(cardController.cardView)
    }
    this.#editorController.connect(this.#selectedCardController.card, removeCard)
  }
}
