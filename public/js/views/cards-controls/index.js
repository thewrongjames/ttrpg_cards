import { StyledComponent } from '/js/library/styled-component/index.js'
import { RadioView } from '/js/views/radio/index.js'

export class CardsControlsView extends StyledComponent {
  /** @type {(() => void)|undefined} */
  onAddCardClicked
  /** @type {(() => void)|undefined} */
  onPrintClicked
  /** @type {(() => void)|undefined} */
  onResetClicked

  constructor() {
    super(['/js/views/cards-controls/styles.css'])

    const printButton = document.createElement('button')
    printButton.innerText = 'Print'
    printButton.addEventListener('click', () => this.onPrintClicked?.())
    
    const resetButton = document.createElement('button')
    resetButton.innerText = 'Reset'
    resetButton.addEventListener('click', () => this.onResetClicked?.())
    
    const addCardButton = document.createElement('button')
    addCardButton.innerText = 'Add card'
    addCardButton.addEventListener('click', () => this.onAddCardClicked?.())

    const globalActionRow = document.createElement('div')
    globalActionRow.classList.add('button-row')
    globalActionRow.appendChild(printButton)
    globalActionRow.appendChild(resetButton)
    globalActionRow.appendChild(addCardButton)

    const cardBackSettings = new RadioView(
      new Map([['front', 'Only Front'], ['back', 'Only Back'], ['both', 'Both']]),
      'cards-controls-card-back-radio',
      'both',
    )
    cardBackSettings.onChange = value => console.log(`card back radio change: ${value}`)

    const selectedCardActionRow = document.createElement('div')
    selectedCardActionRow.classList.add('button-row')

    const container = document.createElement('div')
    container.classList.add('card-controls')
    container.appendChild(globalActionRow)
    container.appendChild(cardBackSettings)
    container.appendChild(selectedCardActionRow)
    
    this.shadowRoot.appendChild(container)
  }
}

customElements.define('cards-controls-view', CardsControlsView)