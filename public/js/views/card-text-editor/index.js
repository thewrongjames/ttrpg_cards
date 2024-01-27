import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardTextEditorView extends StyledComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.getStyledShadow('/js/views/card-text-editor/styles.css')

    const text = document.createElement('div')
    text.innerText = 'CardTextEditorView'
    console.log(text)

    shadow.appendChild(text)
  }
}

customElements.define('card-text-editor-view', CardTextEditorView)
