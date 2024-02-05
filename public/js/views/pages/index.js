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
    super()

    this.#container = document.createElement('div')
    this.#container.classList.add('pages')
  }


  connectedCallback() {
    const shadow = this.getShadow(['/js/views/pages/styles.css'])
    shadow.appendChild(this.#container)
  }

  /** @param {CardView} cardView */
  addCard(cardView) {
    const cardIndex = this.#cards.length
    const pageIndex = Math.floor(cardIndex / NUMBER_OF_CARDS_PER_PAGE)
    console.log(cardIndex, pageIndex)

    let page = this.#pages[pageIndex]
    console.log(page)
    if (page === undefined) {
      page = document.createElement('div')
      page.classList.add('page')
      this.#container.appendChild(page)
      this.#pages.push(page)
    }

    this.#cards.push(cardView)
    page.appendChild(cardView)
  }

  /** @param {number} cardIndex  */
  removeCard(cardIndex) {
    const card = this.#cards[cardIndex]
    if (card === undefined) {
      throw new IndexError(`there is no card with index ${cardIndex}`)
    }

    const pageIndex = cardIndex % NUMBER_OF_CARDS_PER_PAGE
    let previousPage = this.#pages[pageIndex]
    if (previousPage === undefined) {
      throw new IndexError(`there is no page with index ${pageIndex}`)
    }

    card.remove()
    for (const page of this.#pages.slice(pageIndex)) {
      const firstCard = page.firstChild
      if (firstCard === null) {
        throw new DOMStateError('found page with no cards')
      }

      firstCard.remove()
      previousPage.appendChild(firstCard)

      if (page.children.length === 0) {
        page.remove()
      }

      previousPage = page
    }
  }
}

customElements.define('pages-view', PagesView)
