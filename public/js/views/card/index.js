import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardView extends StyledComponent {
  /** @type {Record<number, HTMLElement>} */
  #sections = {}

  #name
  #type
  
  constructor() {
    super()

    this.#name = document.createElement('p')
    this.#name.setAttribute('class', 'card-name')

    this.#type = document.createElement('p')
    this.#type.setAttribute('class', 'card-type')
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card/styles.css')

    const container = document.createElement('div')
    container.setAttribute('class', 'card')

    shadow.appendChild(container)
    container.appendChild(this.#name)
    container.appendChild(this.#type)
  }

  /** @param {string} name */
  set name(name) {
    this.#name.innerText = name
  }

  /** @param {string} type */
  set type(type) {
    this.#type.innerText = type
  }
}

customElements.define('card-view', CardView)