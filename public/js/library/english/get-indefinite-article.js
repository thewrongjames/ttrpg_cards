/** @type {Set<string|undefined>} */
const vowels = new Set('aeiou')

/**
 * @param {string} word
 * @return {string}
 */
export function getIndefiniteArticle(word) {
  if (vowels.has(word[0])) {
    return 'an'
  }
  return 'a'
}