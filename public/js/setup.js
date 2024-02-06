import { CardsControlsView } from '/js/views/cards-controls/index.js'
import { PagesView } from '/js/views/pages/index.js'
import { CardEditorView } from '/js/views/card-editor/index.js'

import { CardsController } from '/js/controllers/cards.js'

function setup() {
  const cardsControlsView = document.getElementById('cards-controls')
  if (!(cardsControlsView instanceof CardsControlsView)) {
    throw new Error('invalid cardsControlsView')
  }

  const cardEditorView = document.getElementById('card-editor-view')
  if (!(cardEditorView instanceof CardEditorView)) {
    throw new Error('invalid cardEditorView')
  }
  
  const pagesView = document.getElementById('pages')
  if (!(pagesView instanceof PagesView)) {
    throw new Error('invalid pagesView')
  }

  new CardsController(cardsControlsView, cardEditorView, pagesView)
}

setup()