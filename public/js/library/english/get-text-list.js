/**
 * @param {string[]} items 
 * @param {'and'|'or'} joiner 
 * @param {boolean} oxfordComma
 * @returns {string}
 */
export function getTextList(items, joiner, oxfordComma=true) {
  if (items.length <= 1) {
    return items.join('')
  }

  const maybeAnOxfordComma = oxfordComma && items.length > 2 ? ',' : ''
  return `${items.slice(0, -1).join(', ')}${maybeAnOxfordComma} ${joiner} ${items.at(-1)}`
}

/**
 * @param {string[]} items 
 * @param {'and'|'or'} joiner 
 * @param {boolean} oxfordComma 
 * @returns {string}
 */
export function getQuotedTextList(items, joiner, oxfordComma=true) {
  return getTextList(items.map(item => `"${item}"`), joiner, oxfordComma)
}
