import { StyledComponent } from '/js/library/styled-component/index.js'

export class CardsControlsView extends StyledComponent {
  /** @type {(() => void)|undefined} */
  onAddCardClicked
  /** @type {(() => void)|undefined} */
  onPrintClicked

  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.getShadow(['/js/views/cards-controls/styles.css'])
    
    const printButton = document.createElement('button')
    printButton.innerText = 'Print'
    printButton.addEventListener('click', () => this.onPrintClicked?.())
    
    const addCardButton = document.createElement('button')
    addCardButton.innerText = 'Add card'
    addCardButton.addEventListener('click', () => this.onAddCardClicked?.())
    
    const globalActionRow = document.createElement('div')
    globalActionRow.classList.add('button-row')
    globalActionRow.appendChild(printButton)
    globalActionRow.appendChild(addCardButton)

    const cardBackSettings = document.createElement('div')
    cardBackSettings.innerText = 'Something to control the displaying of card backs.'

    const container = document.createElement('div')
    container.classList.add('card-controls')
    container.appendChild(globalActionRow)
    container.appendChild(cardBackSettings)
    shadow.appendChild(container)
  }
}

customElements.define('cards-controls-view', CardsControlsView)