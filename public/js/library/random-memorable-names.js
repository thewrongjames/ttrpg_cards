const NUMBER_OF_NAME_COMPONENTS = 3

const nameComponents = [
  'apple',
  'cinnamon',
  'laptop',
  'tennis',
  'avocado',
  'beach',
  'telephone',
  'upside',
  'down',
  'negative',
  'gaussian',
  'distribution',
  'teleportation',
  'incidental',
  'graphical',
  'debugging',
  'terrible',
  'beautiful',
  'amazing',
  'spider',
  'cookie',
  'message',
  'flexible',
  'creative',
  'printer',
  'paper',
  'music',
  'literal',
  'flute',
  'colourful',
  'direction',
  'element',
]

/** @return {string} */
function getRandomNameComponent() {
  const index = Math.floor(Math.random() * nameComponents.length)
  const nameComponent = nameComponents[index]
  if (nameComponent === undefined) {
    throw new Error(`generated invalid random index ${index}`)
  }
  return nameComponent
}

/** @return {string} */
export function makeRandomMemorableName() {
  return Array(NUMBER_OF_NAME_COMPONENTS).fill(0).map(getRandomNameComponent).join('-')
}
