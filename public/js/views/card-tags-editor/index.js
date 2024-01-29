import { IndexError } from '/js/library/errors/index-error.js'

import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardTagsEditorView extends CardSectionEditorView {
  /** @type {Record<number, HTMLElement>} */
  #tags = {}
  /** @type {(() => void)|undefined} */
  #onAddTag
  /** @type {HTMLElement} */
  #tagsContainer

  #newTagInput

  constructor() {
    super('card-tags-editor')

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
      console.log(this.#tags)
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
    this.#tagsContainer.appendChild(tag)
  }

  /**
   * Remove the tag at the given index if there is one, do nothing if there is not.
   * @param {number} index
   */
  removeTag(index) {
    this.#tags[index]?.remove()
    delete this.#tags[index]
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
