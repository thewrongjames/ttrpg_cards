import { StyledComponent } from '/js/library/styled-component/index.js'

/**
 * @typedef {object} CallbackButtonAction
 * @property {'callback'} type
 * @property {() => void} callback
 */

/**
 * @typedef {object} SubmitButtonAction
 * @property {'submit'} type
 */

/**
 * @typedef {object} NoneButtonAction
 * @property {'none'} type
 */

/** @typedef {CallbackButtonAction|SubmitButtonAction|NoneButtonAction} ButtonAction */

export class ButtonView extends StyledComponent {
  static get formAssociated() { return true }

  #button
  #internals

  #buttonAction

  /**
   * @param {string} text
   * @param {ButtonAction} buttonAction
   */
  constructor(text, buttonAction={type: 'none'}) {
    super(['/js/views/button/styles.css'])
    this.#internals = this.attachInternals()
    
    this.#button = document.createElement('button')
    this.#button.classList.add('button')
    this.#button.innerText = text
    
    this.#buttonAction = buttonAction
    this.#button.type = this.#buttonAction.type === 'submit' ? 'submit' : 'button'

    this.#button.addEventListener('click', () => {
      switch (this.buttonAction.type) {
        case 'callback':
          this.buttonAction.callback()
          break
        case 'submit':
          // TODO: work out how to be able to pass an accurate "submitter" here.
          this.#internals.form?.requestSubmit()
          break
        case 'none':
          break
        default: {
          /* eslint-disable @typescript-eslint/no-unused-vars */
          /** @type {never} */
          const exhaustivenessCheck = this.buttonAction
          /* eslint-enable @typescript-eslint/no-unused-vars */
        }
      }
    })

    this.shadowRoot.appendChild(this.#button)
  }

  /** @param {string} newText  */
  set text(newText) {
    this.#button.innerText = newText
  }
  /** @returns {string} */
  get text() {
    return this.#button.innerText
  }

  /** @param {ButtonAction} newButtonAction  */
  set buttonAction(newButtonAction) {
    this.#buttonAction = newButtonAction
    this.#button.type = this.#buttonAction.type === 'submit' ? 'submit' : 'button'
  }
  /** @returns {ButtonAction} */
  get buttonAction() {
    return this.#buttonAction
  }
}

customElements.define('button-view', ButtonView)
