import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTagsView extends StyledComponent {
  /** @type {Record<number, HTMLElement>} */
  #tags = {}

  #container

  constructor() {
    super()

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', 'card-tags')
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-tags/styles.css'])
    shadow.appendChild(this.#container)
  }

  /**
   * @param {number} index 
   * @param {string} text 
   */
  addTag(index, text) {
    const tag = document.createElement('div')
    tag.innerText = text
    this.#tags[index] = tag
    this.#container.appendChild(tag)
  }

  /** @param {number} index */
  removeTag(index) { 
    this.#tags[index]?.remove()
    delete this.#tags[index]
  }
}

customElements.define('card-tags-view', CardTagsView)
