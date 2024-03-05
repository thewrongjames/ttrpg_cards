import { allTriggers } from '/js/library/models/listenable.js'

import { loadCardsFromStorage, saveCardsToStorage } from '/js/services/storage.js'
import { makeStartingCard } from '/js/data/starting-cards.js'

import { Card } from '/js/models/card.js'
import { Cards } from '/js/models/cards.js'

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

  #cards = new Cards()

  /** @type {CardView|undefined} */
  #selectedCardView
  /** @type {Map<Card,CardView>} */
  #cardViews = new Map

  /**
   * @param {CardsControlsView} cardsControlsView
   * @param {CardEditorView} cardEditorView
   * @param {PagesView} pagesView
   */
  constructor(cardsControlsView, cardEditorView, pagesView) {
    this.#cardsControlsView = cardsControlsView
    this.#editorController = new EditorController(cardEditorView)
    this.#pagesView = pagesView

    // Connect up the model to the view.
    this.#cards.subscribe('append', ({card}) => {
      const cardView = new CardView()
      new CardController(card, cardView)
      this.#cardViews.set(card, cardView)
      
      this.#pagesView.addCard(cardView)
      cardView.onClick = () => this.#selectCard(card)
    })
    this.#cards.subscribe('remove', ({card}) => {
      this.#editorController.connect(undefined, undefined)
      this.#selectedCardView = undefined
      
      const cardView = this.#cardViews.get(card)
      if (cardView === undefined) {
        throw new Error('could not find the view for the card being removed')
      }
      this.#pagesView.removeCard(cardView)

      this.#cardViews.delete(card)
    })
    
    // Setup loading from and saving to local storage.
    for (const card of loadCardsFromStorage().values()) {
      this.#cards.append(card)
    }
    this.#cards.subscribe(allTriggers, () => saveCardsToStorage(this.#cards))
    
    // Setup the global buttons.
    this.#cardsControlsView.onPrintClicked = () => print()
    this.#cardsControlsView.onResetClicked = () => {
      this.#cards.clear()
      const card = makeStartingCard()
      this.#cards.append(card)
      this.#selectCard(card)
    }
    this.#cardsControlsView.onAddCardClicked = () => {
      const card = new Card()
      this.#cards.append(card)
      this.#selectCard(card)
    }
  }

  /** @param {Card} card  */
  #selectCard(card) {
    const newSelectedView = this.#cardViews.get(card)
    if (newSelectedView === undefined) {
      throw new Error('could not find the view for given card')
    }

    if (this.#selectedCardView !== undefined) {
      this.#selectedCardView.selected = false
    }

    newSelectedView.selected = true
    this.#selectedCardView = newSelectedView

    this.#editorController.connect(card, () => this.#cards.remove(card))
  }
}
