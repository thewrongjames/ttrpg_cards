export class StyledComponent extends HTMLElement {
  constructor() {
    super()
  }

  /**
   * @param {string[]} styleSheetPaths
   * @returns {ShadowRoot}
   */
  getShadow(styleSheetPaths) {
    const shadow = this.attachShadow({mode: 'open'})

    const commonStylesLink = document.createElement('link')
    commonStylesLink.setAttribute('rel', 'stylesheet')
    commonStylesLink.setAttribute('href', '/js/library/styled-component/common-styles.css')
    shadow.appendChild(commonStylesLink)

    for (const styleSheetPath of styleSheetPaths) {
      const stylesLink = document.createElement('link')
      stylesLink.setAttribute('rel', 'stylesheet')
      stylesLink.setAttribute('href', styleSheetPath)
      shadow.appendChild(stylesLink)
    }

    return shadow
  }
}