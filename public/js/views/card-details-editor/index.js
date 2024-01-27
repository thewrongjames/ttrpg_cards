import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardDetailsEditorView extends StyledComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card-details-editor/styles.css')

    const text = document.createElement('div')
    text.innerText = 'CardDetailsEditorView'

    shadow.appendChild(text)
  }
}

customElements.define('card-details-editor-view', CardDetailsEditorView)
