import { StyledComponent } from '/js/library/styled-component/index.js'

/** @typedef {import('/js/models/card-sections/card-heading.js').CardHeadingLevel} CardHeadingLevel */
/** @typedef {import('/js/models/card-sections/card-heading.js').CardHeadingJustification} CardHeadingJustification */

export class CardHeadingView extends StyledComponent {
  static #levelAttributeName = 'card-heading-view_level'
  static #justificationAttributeName = 'card-heading-view_justification'

  #textElement

  /**
   * @param {string} text 
   * @param {CardHeadingLevel} level 
   * @param {CardHeadingJustification} justification 
   */
  constructor(text, level, justification) {
    super(['/js/views/card-heading/styles.css'])

    this.#textElement = document.createElement('p')
    this.text = text
    this.level = level
    this.justification = justification

    this.shadowRoot.appendChild(this.#textElement)
  }

  /** @param {string} newText */
  set text(newText) {
    this.#textElement.innerText = newText
  }
  /** @param {CardHeadingLevel} newLevel */
  set level(newLevel) {
    this.#textElement.setAttribute(CardHeadingView.#levelAttributeName, newLevel)
  }
  /** @param {CardHeadingJustification} newJustification */
  set justification(newJustification) {
    this.#textElement.setAttribute(CardHeadingView.#justificationAttributeName, newJustification)
  }
}

customElements.define('card-heading-view', CardHeadingView)
