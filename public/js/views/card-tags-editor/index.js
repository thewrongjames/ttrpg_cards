import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTagsEditorView extends StyledComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card-tags-editor/styles.css')

    const text = document.createElement('div')
    text.innerText = 'CardTagsEditorView'

    shadow.appendChild(text)
  }
}

customElements.define('card-tags-editor-view', CardTagsEditorView)
