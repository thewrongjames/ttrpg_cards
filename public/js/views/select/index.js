import { DOMStateError } from '/js/library/errors/dom-state-error.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

/** @template {string} Value */
export class SelectView extends StyledComponent {
  /** @type {Value[]} */
  #values
  /** @type {HTMLSelectElement} */
  #selector
  /** @type {(() => void) | undefined} */
  onChange


  /**
   * @param {[Value, string][]} valuesAndDisplayText
   * @param {Value} defaultValue
   */
  constructor(valuesAndDisplayText, defaultValue) {
    super(['/js/views/select/styles.css'])

    this.#values = valuesAndDisplayText.map(([value]) => value)

    this.#selector = document.createElement('select')
    for (const [value, displayText] of valuesAndDisplayText) {
      const option = document.createElement('option')
      option.setAttribute('value', value)
      option.innerText = displayText
      if (value === defaultValue) {
        option.setAttribute('selected', 'true')
      }
      this.#selector.appendChild(option)
    }

    this.#selector.addEventListener('input', () => this.onChange?.())

    this.shadowRoot.appendChild(this.#selector)
  }

  /** @returns {Value} */
  get value() {
    const value = this.#values.find(validValue => this.#selector.value === validValue)
    
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