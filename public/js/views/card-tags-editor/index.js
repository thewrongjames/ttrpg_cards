import { IndexError } from '/js/library/errors/index-error.js'

import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardTagsEditorView extends CardSectionEditorView {
  /** @type {Map<number, HTMLElement>} */
  #tags = new Map()
  /** @type {(() => void)|undefined} */
  #onAddTag
  /** @type {HTMLElement} */
  #tagsContainer

  #newTagInput

  constructor() {
    super('card-tags-editor', ['/js/views/card-tags-editor/styles.css'])

    this.#tagsContainer = document.createElement('div')
    this.#tagsContainer.classList.add('tags')

    this.#newTagInput = document.createElement('input')
    this.#newTagInput.setAttribute('type', 'text')

    const addTagButton = document.createElement('button')
    addTagButton.innerText = 'Add'
    addTagButton.setAttribute('type', 'submit')

    const newTagForm = document.createElement('form')
    newTagForm.classList.add('new-tag-controls')
    newTagForm.appendChild(this.#newTagInput)
    newTagForm.appendChild(addTagButton)
    newTagForm.addEventListener('submit', event => {
      event.preventDefault()
      this.#onAddTag?.()
    })

    this.container.appendChild(this.#tagsContainer)
    this.container.appendChild(newTagForm)

    this.shadowRoot.appendChild(this.container)
  }

  /**
   * @param {number} index 
   * @param {string} text 
   * @param {() => void} onRemove
   * @throws {IndexError} If there is already a tag at the given index.
   */
  addTag(index, text, onRemove) {
    if (this.#tags.get(index) !== undefined) {
      throw new IndexError(`there is already a tag at index ${index}`)
    }

    const tag = document.createElement('div')
    tag.classList.add('tag')

    const tagText = document.createElement('span')
    tagText.innerText = text

    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remove'
    removeButton.addEventListener('click', onRemove)

    tag.appendChild(tagText)
    tag.appendChild(removeButton)

    this.#tags.set(index, tag)
    this.#tagsContainer.appendChild(tag)
  }

  /**
   * Remove the tag at the given index if there is one, do nothing if there is not.
   * @param {number} index
   */
  removeTag(index) {
    this.#tags.get(index)?.remove()
    this.#tags.delete(index)
  }

  get newTagText() {
    return this.#newTagInput.value
  }
  /** @param {string} newNewTagText  */
  set newTagText(newNewTagText) {
    this.#newTagInput.value = newNewTagText
  }

  /** @param {(() => void)|undefined} newOnAddTag  */
  set onAddTag(newOnAddTag) {
    this.#onAddTag = newOnAddTag
  }
}

customElements.define('card-tags-editor-view', CardTagsEditorView)
