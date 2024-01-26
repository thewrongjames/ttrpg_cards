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

    this.#type = document.createElement('p')
    this.#type.setAttribute('class', 'card-type')

    this.#container.appendChild(this.#name)
    this.#container.appendChild(this.#type)
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card/styles.css')
    shadow.appendChild(this.#container)
  }

  /** @param {string} name */
  set name(name) {
    this.#name.innerText = name
  }

  /** @param {string} type */
  set type(type) {
    this.#type.innerText = type
  }

  /**
   * @param {number} index 
   * @param {HTMLElement} element 
   */
  addSection(index, element) {
    this.#sections[index] = element
    this.#container.appendChild(element)
  }
  
  /** @param {number} index */
  removeSection(index) {
    this.#sections[index]?.remove()
    delete this.#sections[index]
  }
}

customElements.define('card-view', CardView)