import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardTagsEditorView extends CardSectionEditorView {
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
}

customElements.define('card-tags-editor-view', CardTagsEditorView)
