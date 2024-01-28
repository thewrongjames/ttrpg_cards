import { CardSectionEditorView } from '/js/views/card-section-editor/index.js'

export class CardDetailsEditorView extends CardSectionEditorView {
  constructor() {
    super('card-details-editor')

    const text = document.createElement('div')
    text.innerText = 'CardDetailsEditorView'

    this.container.appendChild(text)
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/card-details-editor/styles.css'])
    shadow.appendChild(this.container)
  }
}

customElements.define('card-details-editor-view', CardDetailsEditorView)
