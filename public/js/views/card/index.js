import { IndexError } from '/js/library/errors/index-error.js'

import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardView extends StyledComponent {
  static #selectedAttributeName = 'selected'

  /** @type {Record<number, HTMLElement>} */
  #sections = {}
  /** @type {(() => void)|undefined} */
  #onClick

  #container
  #name
  #type
  
  constructor() {
    super(['/js/views/card/styles.css'])

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', 'card')
    this.#container.addEventListener('click', () => this.#onClick?.())

    this.#name = document.createElement('p')
    this.#name.setAttribute('class', 'card-name')
    this.name = ''
    
    this.#type = document.createElement('p')
    this.#type.setAttribute('class', 'card-type')
    this.type = ''

    this.#container.appendChild(this.#name)
    this.#container.appendChild(this.#type)

    this.shadowRoot.appendChild(this.#container)
  }

  get name() {
    return this.#name.innerText
  }
  /** @param {string} name */
  set name(name) {
    this.#name.innerText = name
    if (name === '') {
      this.#name.setAttribute('hidden', '')
    } else {
      this.#name.removeAttribute('hidden')
    }
  }

  get type() {
    return this.#type.innerText
  }
  /** @param {string} type */
  set type(type) {
    this.#type.innerText = type
    if (type === '') {
      this.#type.setAttribute('hidden', '')
    } else {
      this.#type.removeAttribute('hidden')
    }
  }

  /**
   * @param {number} index 
   * @param {HTMLElement} element
   * @throws {IndexError} If there is already a section at the given index.
   */
  addSection(index, element) {
    if (this.#sections[index] !== undefined) {
      throw new IndexError(`there is already a section at index ${index}`)
    }

    this.#sections[index] = element
    this.#container.appendChild(element)
  }
  
  /**
   * Remove the section at the given index if there is one, do nothing if there isn't.
   * @param {number} index
   */
  removeSection(index) {
    this.#sections[index]?.remove()
    delete this.#sections[index]
  }

  /** @param {(() => void)|undefined} newOnClick  */
  set onClick(newOnClick) {
    this.#onClick = newOnClick
  }

  get selected() {
    return this.#container.hasAttribute(CardView.#selectedAttributeName)
  }

  /** @param {boolean} newSelected */
  set selected(newSelected) {
    if (newSelected) {
      this.#container.setAttribute(CardView.#selectedAttributeName, 'true')
    } else {
      this.#container.removeAttribute(CardView.#selectedAttributeName)
    }
  }
}

customElements.define('card-view', CardView)