import { IndexError } from '/js/library/errors/index-error.js'

import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardView extends StyledComponent {
  /** @type {Record<number, HTMLElement>} */
  #sections = {}

  #container
  #name
  #type
  
  constructor() {
    super()

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', 'card')

    this.#name = document.createElement('p')
    this.#name.setAttribute('class', 'card-name')
    this.name = ''
    
    this.#type = document.createElement('p')
    this.#type.setAttribute('class', 'card-type')
    this.type = ''

    this.#container.appendChild(this.#name)
    this.#container.appendChild(this.#type)
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card/styles.css'])
    shadow.appendChild(this.#container)
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
}

customElements.define('card-view', CardView)