import { IndexError } from '/js/library/errors/index-error.js'

import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardDetailsEditorView extends CardSectionEditorView {
  /** @type {Map<number, HTMLElement>} */
  #details = new Map()
  /** @type {(() => void)|undefined} */
  #onAddDetail
  /** @type {HTMLElement} */
  #detailsContainer

  constructor() {
    super('card-details-editor', ['/js/views/card-details-editor/styles.css'])

    this.#detailsContainer = document.createElement('detail')
    this.#detailsContainer.classList.add('details')

    const addDetailButton = document.createElement('button')
    addDetailButton.classList.add('new-detail-button')
    addDetailButton.innerText = 'New detail'
    addDetailButton.addEventListener('click', () => this.#onAddDetail?.())

    this.container.appendChild(this.#detailsContainer)
    this.container.appendChild(addDetailButton)

    this.shadowRoot.appendChild(this.container)
  }

  /**
   * @param {number} index 
   * @param {string} keyText 
   * @param {string} valueText 
   * @param {(newKeyText: string) => void} onKeyTextChange 
   * @param {(newValueText: string) => void} onValueTextChange 
   * @param {() => void} onRemove 
   */
  addDetail(index, keyText, valueText, onKeyTextChange, onValueTextChange, onRemove) {
    if (this.#details.get(index) !== undefined) {
      throw new IndexError(`there is already a detail at index ${index}`)
    }

    const detail = document.createElement('div')
    detail.classList.add('detail')

    const keyField = document.createElement('input')
    keyField.classList.add('key-field')
    keyField.value = keyText
    keyField.addEventListener('input', () => onKeyTextChange(keyField.value))

    const valueField = document.createElement('input')
    valueField.classList.add('value-field')
    valueField.value = valueText
    valueField.addEventListener('input', () => onValueTextChange(valueField.value))

    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remove'
    removeButton.addEventListener('click', onRemove)

    detail.appendChild(keyField)
    detail.appendChild(valueField)
    detail.appendChild(removeButton)

    this.#details.set(index, detail)
    this.#detailsContainer.appendChild(detail)
  }

  /** @param {number} index  */
  removeTag(index) {
    this.#details.get(index)?.remove()
    this.#details.delete(index)
  }

  /** @param {(() => void)|undefined} newOnAddDetail */
  set onAddDetail(newOnAddDetail) {
    this.#onAddDetail = newOnAddDetail
  }
}

customElements.define('card-details-editor-view', CardDetailsEditorView)
