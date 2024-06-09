import { SelectView } from '/js/views/select/index.js'
import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

/** @typedef {import('/js/models/card-sections/card-heading.js').CardHeadingLevel} CardHeadingLevel */
/** @typedef {import('/js/models/card-sections/card-heading.js').CardHeadingJustification} CardHeadingJustification */

export class CardHeadingEditorView extends CardSectionEditorView {
  /** @type {(() => void)|undefined} */
  onTextChange
  /** @type {(() => void)|undefined} */
  onLevelChange
  /** @type {(() => void)|undefined} */
  onJustificationChange

  #input
  #levelSelector
  #justificationSelector

  /**
   * @param {string} text
   * @param {CardHeadingLevel} level
   * @param {CardHeadingJustification} justification
   */
  constructor(text, level, justification) {
    super('card-text-editor', ['/js/views/card-heading-editor/styles.css'])

    this.#input = document.createElement('input')
    this.#input.value = text
    this.#input.addEventListener('input', () => this.onTextChange?.())

    this.#levelSelector = new SelectView([['title', 'Title'], ['subtitle', 'Subtitle']], level)
    this.#levelSelector.onChange = () => this.onLevelChange?.()

    this.#justificationSelector = new SelectView([['centre', 'Centre'], ['left', 'Left'], ['right', 'Right']], justification)
    this.#justificationSelector.onChange = () => this.onJustificationChange?.()

    const optionsContainer = document.createElement('div')
    optionsContainer.classList.add('options-container')
    optionsContainer.appendChild(this.#levelSelector)
    optionsContainer.appendChild(this.#justificationSelector)

    this.container.appendChild(this.#input)
    this.container.appendChild(optionsContainer)

    this.shadowRoot.appendChild(this.container)
  }

  /** @returns {string} */
  get text() {
    return this.#input.value
  }
  /** @returns {CardHeadingLevel} */
  get level() {
    return this.#levelSelector.value
  }
  /** @returns {CardHeadingJustification} */
  get justification() {
    return this.#justificationSelector.value
  }
}

customElements.define('card-heading-editor-view', CardHeadingEditorView)
