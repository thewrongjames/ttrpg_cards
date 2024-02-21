import { IndexError } from '/js/library/errors/index-error.js'

import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardDetailsView extends StyledComponent {
  /** @type {Record<number, {key: HTMLElement, value: HTMLElement}>} */
  #details = {}

  #container

  constructor() {
    super(['/js/views/card-details/styles.css'])

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', 'card-details')

    this.shadowRoot.appendChild(this.#container)
  }

  /**
   * @param {number} index 
   * @param {string} detailKeyText 
   * @param {string} detailValueText
   * @throws {IndexError} If there is already a detail at the given index.
   */
  addDetail(index, detailKeyText, detailValueText) {
    if (this.#details[index] !== undefined) {
      throw new IndexError(`there is already a detail at index ${index}`)
    }

    const detailKey = document.createElement('div')
    detailKey.setAttribute('class', 'card-detail-key')
    detailKey.innerText = detailKeyText

    const detailValue = document.createElement('div')
    detailValue.innerText = detailValueText
    
    this.#details[index] = {key: detailKey, value: detailValue}
    this.#container.appendChild(detailKey)
    this.#container.appendChild(detailValue)
  }

  /**
   * Remove the detail at the given index if there is one, do nothing if there isn't.
   * @param {number} index
   */
  removeDetail(index) { 
    this.#details[index]?.key.remove()
    this.#details[index]?.value.remove()
    delete this.#details[index]
  }

  /**
   * @param {number} index
   * @param {string} text
   * @throws {IndexError} If there is no detail at the given index.
   */
  setDetailKey(index, text) {
    const keyElement = this.#details[index]?.key
    if (keyElement === undefined) {
      throw new IndexError(`there is no detail at index ${index}`)
    }
    keyElement.innerText = text
  }

  /**
   * @param {number} index
   * @param {string} text
   * @throws {IndexError} If there is no detail at the given index.
   */
  setDetailValue(index, text) {
    const valueElement = this.#details[index]?.value
    if (valueElement === undefined) {
      throw new IndexError(`there is no detail at index ${index}`)
    }
    valueElement.innerText = text
  } 
}

customElements.define('card-details-view', CardDetailsView)