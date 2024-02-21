import { DOMStateError } from '/js/library/errors/dom-state-error.js'
import { IndexError } from '/js/library/errors/index-error.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

/** @typedef {import("/js/views/card/index.js").CardView} CardView */

const NUMBER_OF_CARDS_PER_PAGE = 9

export class PagesView extends StyledComponent {
  /** @type {HTMLDivElement} */
  #container
  /** @type {HTMLDivElement[]} */
  #pages = []
  /** @type {CardView[]} */
  #cards = []

  constructor() {
    super(['/js/views/pages/styles.css'])

    this.#container = document.createElement('div')
    this.#container.classList.add('pages')

    this.shadowRoot.appendChild(this.#container)
  }

  /** @param {CardView} cardView */
  addCard(cardView) {
    const cardIndex = this.#cards.length
    const pageIndex = Math.floor(cardIndex / NUMBER_OF_CARDS_PER_PAGE)

    let page = this.#pages[pageIndex]
    if (page === undefined) {
      page = document.createElement('div')
      page.classList.add('page')
      this.#container.appendChild(page)
      
      this.#pages.push(page)
    }

    this.#cards.push(cardView)
    page.appendChild(cardView)
  }

  /** @param {CardView} cardView  */
  removeCard(cardView) {
    const cardIndex = this.#cards.indexOf(cardView)
    if (cardIndex === -1) {
      throw new IndexError('the given card view is not currently on the page')
    }

    const pageIndex = Math.floor(cardIndex / NUMBER_OF_CARDS_PER_PAGE)
    let previousPage = this.#pages[pageIndex]
    if (previousPage === undefined) {
      throw new IndexError(`there is no page with index ${pageIndex}`)
    }

    cardView.remove()
    this.#cards.splice(cardIndex, 1)

    // Move the first card on every page after the page containing the removed card to be the last
    // card on the previous page.
    for (const [currentPageIndex, currentPage] of this.#pages.slice(pageIndex + 1).entries()) {
      const firstCard = currentPage.firstChild
      if (firstCard === null) {
        throw new DOMStateError('found page with no cards')
      }

      firstCard.remove()
      previousPage.appendChild(firstCard)

      previousPage = currentPage

      // If the page is now empty, we can remove it.
      if (!currentPage.hasChildNodes()) {
        currentPage.remove()
        this.#pages.splice(currentPageIndex, 1)
      }
    }
  }
}

customElements.define('pages-view', PagesView)
