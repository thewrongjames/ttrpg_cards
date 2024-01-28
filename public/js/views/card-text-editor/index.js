import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTextEditorView extends StyledComponent {
  /** @type {(() => void)|undefined} */
  #onRemoveButtonClicked
  /** @type {(() => void)|undefined} */
  #onTextChange

  #textarea
  #removeButton

  constructor() {
    super()

    this.#textarea = document.createElement('textarea')
    this.#textarea.addEventListener('input', () => this.#onTextChange?.())

    this.#removeButton = document.createElement('button')
    this.#removeButton.innerText = 'Remove'
    this.#removeButton.addEventListener('click', () => this.#onRemoveButtonClicked?.())
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card-text-editor/styles.css')

    const container = document.createElement('div')
    container.setAttribute('class', 'card-text-editor')

    container.appendChild(this.#textarea)
    container.appendChild(this.#removeButton)

    shadow.appendChild(container)
  }

  /** @param {(() => void)|undefined} callback  */
  set onRemoveButtonClicked(callback) {
    this.#onRemoveButtonClicked = callback
  }

  /** @param {(() => void)|undefined} callback  */
  set onTextChange(callback) {
    this.#onTextChange = callback
  }

  get text() {
    return this.#textarea.value
  }
  /** @param {string} newText */
  set text(newText) {
    this.#textarea.value = newText
  }
}

customElements.define('card-text-editor-view', CardTextEditorView)
