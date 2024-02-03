/** @typedef {import('/js/views/cards-controls/index.js').CardsControlsView} CardsControlsView */

export class CardsController {
  #cardsControlsView

  /** @param {CardsControlsView} cardsControlsView  */
  constructor(cardsControlsView) {
    this.#cardsControlsView = cardsControlsView
  }

  /** @param {HTMLElement} parent  */
  connect(parent) {
    this.#cardsControlsView.onAddCardClicked = () => console.log('add card clicked')
    this.#cardsControlsView.onPrintClicked = () => console.log('print clicked')

    parent.appendChild(this.#cardsControlsView)
  }

  disconnect() {
    this.#cardsControlsView.remove()
  }
}