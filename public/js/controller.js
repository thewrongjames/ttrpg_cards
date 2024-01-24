import { InputComponent } from '/js/components/input-component/index.js'
import { CardComponent } from '/js/components/card-component/index.js'
import { Card } from '/js/models/card.js'

function setup() {
  const container = document.getElementById('web-component-test')
  if (container === null) {
    throw new Error('no element with the ID "web-component-test"')
  }
  const controls = document.getElementById('controls')
  if (controls === null) {
    throw new Error('no element with the ID "controls"')
  }

  const card = new Card()
  const cardComponent = new CardComponent(card)
  container.appendChild(cardComponent)

  card.name = 'something'
  card.type = 'something else'

  const inputComponent = new InputComponent(card)
  controls.appendChild(inputComponent)
}

setup()