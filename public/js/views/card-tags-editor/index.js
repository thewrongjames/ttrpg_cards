import { IndexError } from '/js/library/errors/index-error.js'

import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardTagsEditorView extends CardSectionEditorView {
  /** @type {Record<number, HTMLElement>} */
  #tags = {}

  constructor() {
    super('card-tags-editor')

    const text = document.createElement('div')
    text.innerText = 'CardTagsEditorView'

    this.container.appendChild(text)
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-tags-editor/styles.css'])
    shadow.appendChild(this.container)
  }

  /**
   * @param {number} index 
   * @param {string} text 
   * @param {() => void} removalCallback
   * @throws {IndexError} If there is already a tag at the given index.
   */
  addTag(index, text, removalCallback) {
    if (this.#tags[index] !== undefined) {
      throw new IndexError(`there is already a tag at index ${index}`)
    }

    const tag = document.createElement('div')
    tag.setAttribute('class', 'tag')

    const tagText = document.createElement('span')
    tagText.innerText = text

    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remove'
    removeButton.addEventListener('click', removalCallback)

    tag.appendChild(tagText)
    tag.appendChild(removeButton)

    this.#tags[index] = tag
  }

  /**
   * Remove the tag at the given index if there is one, do nothing if there is not.
   * @param {number} index
   */
  removeTag(index) {
    this.#tags[index]?.remove()
    delete this.#tags[index]
  }
}

customElements.define('card-tags-editor-view', CardTagsEditorView)
