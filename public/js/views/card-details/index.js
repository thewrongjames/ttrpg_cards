import { IndexError } from '/js/library/errors/index-error.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardDetailsView extends StyledComponent {
  /** @type {Record<number, {key: HTMLElement, value: HTMLElement}>} */
  #details = {}

  #container

  constructor() {
    super()

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', 'card-details')
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-details/styles.css'])
    shadow.appendChild(this.#container)
  }

  /**
   * @param {number} index 
   * @param {string} detailKeyText 
   * @param {string} detailValueText 
   */
  addDetail(index, detailKeyText, detailValueText) {
    const detailKey = document.createElement('div')
    detailKey.setAttribute('class', 'card-detail-key')
    detailKey.innerText = detailKeyText

    const detailValue = document.createElement('div')
    detailValue.innerText = detailValueText
    
    this.#details[index] = {key: detailKey, value: detailValue}
    this.#container.appendChild(detailKey)
    this.#container.appendChild(detailValue)
  }

  /** @param {number} index */
  removeDetail(index) { 
    this.#details[index]?.key.remove()
    this.#details[index]?.value.remove()
    delete this.#details[index]
  }

  /**
   * @param {number} index
   * @param {string} text
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