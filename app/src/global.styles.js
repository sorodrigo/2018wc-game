import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

export default () => injectGlobal`
  ${styledNormalize}
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto Mono", sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`
