export class StyledComponent extends HTMLElement {
  constructor() {
    super()
  }

  /**
   * @param {string} styleSheetPath
   * @returns {ShadowRoot}
   */
  getStyledShadow(styleSheetPath) {
    const shadow = this.attachShadow({mode: 'open'})

    const commonStylesLink = document.createElement('link')
    commonStylesLink.setAttribute('rel', 'stylesheet')
    commonStylesLink.setAttribute('href', '/js/components/styled-component/common-styles.css')

    const componentStylesLink = document.createElement('link')
    componentStylesLink.setAttribute('rel', 'stylesheet')
    componentStylesLink.setAttribute('href', styleSheetPath)

    shadow.appendChild(commonStylesLink)
    shadow.appendChild(componentStylesLink)
    return shadow
  }
}