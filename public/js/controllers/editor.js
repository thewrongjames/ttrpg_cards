/** @typedef {import('/js/models/card.js').Card} Card */
/** @typedef {import('js/views/editor/index.js').EditorView} EditorView */

export class EditorController {
  #card
  #editorView

  /**
   * @param {Card} card 
   * @param {EditorView} editorView 
   */
  constructor(card, editorView) {
    this.#card = card
    this.#editorView = editorView

    this.#editorView.nameInput.value = this.#card.name
    this.#editorView.typeInput.value = this.#card.type
    this.#editorView.nameInput.addEventListener('input', () => this.#card.name = this.#editorView.nameInput.value)
    this.#editorView.typeInput.addEventListener('input', () => this.#card.type = this.#editorView.typeInput.value)
  }
}