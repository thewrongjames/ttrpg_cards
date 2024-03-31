import { getIndefiniteArticle } from '/js/library/english/get-indefinite-article.js'
import { getQuotedTextList } from '/js/library/english/get-text-list.js'

/**
 * @param {unknown} input 
 * @param {string} name
 * @returns {object}
 * @throws {TypeError} If the given input is not an object. 
 */
export function getObjectOrError(input, name) {
  if (typeof input !== 'object' || input === null) {
    throw new TypeError(`${name} is not an object`)
  }

  return input
}

/**
 * @param {unknown} input 
 * @param {string} name
 * @returns {unknown[]}
 * @throws {TypeError} If the given input is not an array. 
 */
export function getArrayOrError(input, name) {
  if (!Array.isArray(input)) {
    throw new TypeError(`${name} is not an array`)
  }

  return input
}

/**
 * @param {unknown} input 
 * @param {string} name
 * @returns {string}
 * @throws {TypeError} If the given input is not a string. 
 */
export function getStringOrError(input, name) {
  if (typeof input !== 'string') {
    throw new TypeError(`${name} is not a string`)
  }

  return input 
}

/**
 * @param {unknown} input 
 * @param {string} name
 * @returns {number}
 * @throws {TypeError} If the given input is not a number. 
 */
export function getNumberOrError(input, name) {
  if (typeof input !== 'number') {
    throw new TypeError(`${name} is not a number`)
  }

  return input 
}

/**
 * @template T
 * @param {(input: unknown, name: string) => T} validator A function that returns the given input if
 * it is of type T, and throws a TypeError otherwise. 
 * @param {unknown} input 
 * @param {string} name
 * @throws {TypeError} If the given input is not an array of T. 
 * @returns {T[]} 
 */
export function getArrayOfTypeOrError(validator, input, name) {
  const array = getArrayOrError(input, name)

  return array.map((element, index) => validator(element, `${name}[${index}]`))
}

/**
 * @template T
 * @param {unknown} input 
 * @param {string} name
 * @param {Map<string, ((input: unknown, name: string) => T)>} validators A map of functions each
 * validating that the input is one of the types of T by throwing type errors if it is not, keyed by
 * the name of what they are validating.
 * @throws {TypeError} If the given input is not a number. 
 * @returns {T} 
 */
export function getOneOfOrError(input, name, validators) {
  /** @type {string[]} */
  const failureMessages = []
  for (const [validName, validator] of validators.entries()) {
    try {
      return validator(input, name)
    } catch (error) {
      if (!(error instanceof TypeError)) {
        throw error
      }
      failureMessages.push(`${name} is not ${getIndefiniteArticle(validName)} ${validName} (${error.message})`)
    }
  }

  throw new TypeError(failureMessages.join(', '))
}

/**
 * @template T
 * @param {unknown} input 
 * @param {string} name 
 * @param {T[]} validValues 
 * @throws {TypeError}
 * @returns {T}
 */
export function getElementOfArrayOrError(input, name, validValues) {
  const value = validValues.find(validValue => input === validValue)
  if (value === undefined) {
    const validValueNames = validValues.map(validValue => `${validValue}`)
    throw new TypeError(`${name} is not ${getQuotedTextList(validValueNames, 'or')}`)
  }

  return value
}
