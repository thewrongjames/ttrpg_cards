import { StyledComponent } from '/js/library/styled-component/index.js'
import { ButtonView } from '/js/views/button/index.js'

/**
 * A component implementing the base functionality of a card section editor view. Subclasses will
 * need to implement the connectedCallback.
 */
export class CardSectionEditorView extends StyledComponent {
  /** @type {(() => void)|undefined} */
  #onRemoveButtonClicked

  #container

  /**
   * @param {string} cssClassName
   * @param {string[]} styleSheetPaths
   */
  constructor(cssClassName, styleSheetPaths) {
    super(['/js/views/card-section-editor/styles.css', ...styleSheetPaths])

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', `card-section-editor ${cssClassName}`)

    const removeButton = new ButtonView(
      'Remove',
      {type: 'callback', callback: () => this.#onRemoveButtonClicked?.()},
    )
    removeButton.classList.add('remove-button')

    this.#container.appendChild(removeButton)
  }

  /** @param {(() => void)|undefined} callback  */
  set onRemoveButtonClicked(callback) {
    this.#onRemoveButtonClicked = callback
  }

  // The container needs to be accessible for sub-classes to use it.
  get container() {
    return this.#container
  }
}