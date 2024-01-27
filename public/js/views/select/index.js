import { DOMStateError } from '/js/library/errors/dom-state-error.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

/** @template {string} Value */
export class SelectView extends StyledComponent {
  /** @type {Value[]} */
  #values

  #selector

  /** @param {[Value, string][]} valuesAndDisplayText */
  constructor(valuesAndDisplayText) {
    super()

    this.#values = valuesAndDisplayText.map(([value]) => value)

    this.#selector = document.createElement('select')
    for (const [value, displayText] of valuesAndDisplayText) {
      const option = document.createElement('option')
      option.setAttribute('value', value)
      option.innerText = displayText
      this.#selector.appendChild(option)
    }
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/select/styles.css')
    shadow.appendChild(this.#selector)
  }

  /** @returns {Value} */
  get value() {
    const value = this.#values.find((validValue => this.#selector.value === validValue))
    
    if (value === undefined) {
      throw new DOMStateError(
        `select element had unexpected value "${this.#selector.value}", expected one of `
        + this.#values.map(value => `"${value}"`).join(', '),
      )
    }

    return value
  }
}

customElements.define('select-view', SelectView)