export class StyledComponent extends HTMLElement {
  /** @type {ShadowRoot} */
  shadowRoot

  /** @param {string[]} styleSheetPaths */
  constructor(styleSheetPaths) {
    super()

    this.shadowRoot = this.attachShadow({mode: 'open'})

    const commonStylesLink = document.createElement('link')
    commonStylesLink.setAttribute('rel', 'stylesheet')
    commonStylesLink.setAttribute('href', '/js/library/styled-component/common-styles.css')
    this.shadowRoot.appendChild(commonStylesLink)

    for (const styleSheetPath of styleSheetPaths) {
      const stylesLink = document.createElement('link')
      stylesLink.setAttribute('rel', 'stylesheet')
      stylesLink.setAttribute('href', styleSheetPath)
      this.shadowRoot.appendChild(stylesLink)
    }
  }
}
