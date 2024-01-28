import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardTextEditorView extends CardSectionEditorView {
  /** @type {(() => void)|undefined} */
  #onTextChange

  #textarea

  constructor() {
    super('card-text-editor')

    this.#textarea = document.createElement('textarea')
    this.#textarea.addEventListener('input', () => this.#onTextChange?.())

    this.container.appendChild(this.#textarea)
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-text-editor/styles.css'])
    shadow.appendChild(this.container)
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
