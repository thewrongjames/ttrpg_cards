import { IndexError } from '/js/library/errors/index-error.js'

import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTagsView extends StyledComponent {
  /** @type {Map<number, HTMLElement>} */
  #tags = new Map()

  #container

  constructor() {
    super(['/js/views/card-tags/styles.css'])

    this.#container = document.createElement('div')
    this.#container.setAttribute('class', 'card-tags')

    this.shadowRoot.appendChild(this.#container)
  }

  /**
   * @param {number} index 
   * @param {string} text
   * @throws {IndexError} If there is already a tag at the given index.
   */
  addTag(index, text) {
    if (this.#tags.get(index) !== undefined) {
      throw new IndexError(`there is already a tag at index ${index}`)
    }

    const tag = document.createElement('div')
    tag.innerText = text
    this.#tags.set(index, tag)
    this.#container.appendChild(tag)
  }

  /**
   * Remove the tag at the given index if there is one, do nothing if there isn't.
   * @param {number} index
   */
  removeTag(index) { 
    this.#tags.get(index)?.remove()
    this.#tags.delete(index)
  }
}

customElements.define('card-tags-view', CardTagsView)
