import { InputView } from '/js/views/input/index.js'
import { CardView } from '/js/views/card/index.js'
import { Card } from '/js/models/card.js'
import { CardText } from '/js/models/card-sections.js'
import { CardController } from '/js/controllers/card.js'

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
  const cardView = new CardView()
  new CardController(card, cardView)

  card.name = 'something'
  card.type = 'something else'
  const textSection = new CardText()
  textSection.text = 'This is some body text'
  card.sections.add(textSection)

  const inputView = new InputView(card)

  container.appendChild(cardView)
  controls.appendChild(inputView)
}

setup()