import { Listenable, allTriggers } from '/js/library/models/listenable.js'
import { ListenableList } from '/js/library/models/listenable-list.js'
import { CardHeading, getCardSectionFromPlainObjectCardSection0 } from '/js/models/card-sections/index.js'

/** @typedef {import('/js/models/card-sections/index.js').CardSection} CardSection */
/** @typedef {import('/js/models/plain-object-models/plain-object-card').PlainObjectCard0} PlainObjectCard0 */
/** @typedef {import('/js/models/plain-object-models/plain-object-card').PlainObjectCard1} PlainObjectCard1 */

/** @extends Listenable<'front-sections-triggered'|'back-sections-triggered', {}> */
export class Card extends Listenable {
  /** @type {ListenableList<CardSection>} */
  #frontSections = new ListenableList()
  /** @type {ListenableList<CardSection>} */
  #backSections = new ListenableList()

  constructor() {
    super()

    this.#frontSections.subscribe(allTriggers, () => this._trigger('front-sections-triggered', {}))
    this.#backSections.subscribe(allTriggers, () => this._trigger('back-sections-triggered', {}))
  }

  get frontSections() {
    return this.#frontSections
  }
  get backSections() {
    return this.#backSections
  }

  /** @returns {PlainObjectCard1} */
  toPlainObject() {
    return {
      frontSections: Array.from(this.#frontSections.entries()).map(([, section]) => section.toPlainObject()),
      backSections: Array.from(this.#backSections.entries()).map(([, section]) => section.toPlainObject()),
    }
  }

  /**
   * @param {PlainObjectCard0} plainObject
   * @returns {Card}
   */
  static getFromPlainObjectCard0(plainObject) {
    const card = new Card()

    const name = new CardHeading(plainObject.name, 'title', 'centre')
    card.#frontSections.add(name)

    const type = new CardHeading(plainObject.type, 'subtitle', 'centre')
    card.#frontSections.add(type)

    for (const section of plainObject.sections) {
      card.frontSections.add(getCardSectionFromPlainObjectCardSection0(section))
    }

    return card
  }

  /**
   * @param {PlainObjectCard1} plainObject 
   * @returns {Card}
   */
  static getFromPlainObjectCard1(plainObject) {
    const card = new Card()

    for (const section of plainObject.frontSections) {
      card.frontSections.add(getCardSectionFromPlainObjectCardSection0(section))
    }
    for (const section of plainObject.backSections) {
      card.backSections.add(getCardSectionFromPlainObjectCardSection0(section))
    }

    return card
  }
}
