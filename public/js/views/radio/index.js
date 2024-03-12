import { DOMStateError } from '/js/library/errors/dom-state-error.js'
import { StyledComponent } from '/js/library/styled-component/index.js'

/** @template {string} Value */
export class RadioView extends StyledComponent {
  /** @type {Value[]} */
  #values

  /** @type {((newValue: string) => void)|undefined} */
  onChange

  /**
   * @param {Map<Value, string>} valuesAndDisplayText 
   * @param {string} uniqueInputIdentifier 
   * @param {string} defaultValue
   */
  constructor(valuesAndDisplayText, uniqueInputIdentifier, defaultValue) {
    super(['/js/views/radio/styles.css'])

    this.#values = Array.from(valuesAndDisplayText.keys())

    const container = document.createElement('div')
    container.classList.add('radio')

    for (const [value, displayText] of valuesAndDisplayText.entries()) {
      const input = document.createElement('input')
      input.type = 'radio'
      input.id = `${uniqueInputIdentifier}-${value}`
      input.name = `${uniqueInputIdentifier}`
      input.value = value
      if (value === defaultValue) {
        input.checked = true
      }
      input.addEventListener('change', () => {
        const value = this.#values.find(validValue => input.value === validValue)
        if (value === undefined) {
          throw new DOMStateError(
            `radio input had change event with unexpected value "${value}", expected one of `
              + this.#values.map(value => `"${value}"`).join(', '),
          )
        }

        this.onChange?.(value)
      })

      const label = document.createElement('label')
      label.htmlFor = input.id
      label.innerText = displayText

      container.append(input, label)
    }

    this.shadowRoot.appendChild(container)
  }
}

customElements.define('radio-view', RadioView)