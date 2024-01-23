import { CardComponent } from '/js/components/card-component.js'
import { Card } from '/js/models/card.js'

function setup() {
  const container = document.getElementById('web-component-test')
  if (container === null) {
    throw new Error('no element with the ID "web-component-test"')
  }

  const card = new Card()
  const cardComponent = new CardComponent(card)
  container.appendChild(cardComponent)

  card.name = 'something'
  card.type = 'something else'
}

setup()