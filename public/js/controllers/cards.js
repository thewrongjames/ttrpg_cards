import { allTriggers } from '/js/library/models/listenable.js'

import { loadCardsFromStorage, saveCardsToStorage } from '/js/services/storage.js'

import { Card } from '/js/models/card.js'

import { CardView } from '/js/views/card/index.js'

import { CardController } from '/js/controllers/card.js'
import { EditorController } from '/js/controllers/editor.js'

/** @typedef {import('/js/views/cards-controls/index.js').CardsControlsView} CardsControlsView */
/** @typedef {import('/js/views/card-editor/index.js').CardEditorView} CardEditorView */
/** @typedef {import('/js/views/pages/index.js').PagesView} PagesView */

export class CardsController {
  #cardsControlsView
  #pagesView
  #editorController
  #cards

  /** @type {CardController|undefined} */
  #selectedCardController

  /**
   * @param {CardsControlsView} cardsControlsView
   * @param {CardEditorView} cardEditorView
   * @param {PagesView} pagesView
   */
  constructor(cardsControlsView, cardEditorView, pagesView) {
    this.#cardsControlsView = cardsControlsView
    this.#editorController = new EditorController(cardEditorView)
    this.#pagesView = pagesView

    this.#cards = loadCardsFromStorage()
    for (const card of this.#cards.values()) {
      this.#addCard(card, false)
    }
    this.#cards.subscribe(allTriggers, () => saveCardsToStorage(this.#cards))

    this.#cardsControlsView.onPrintClicked = () => print()
    this.#cardsControlsView.onAddCardClicked = () => this.#addCard(new Card(), true)
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
