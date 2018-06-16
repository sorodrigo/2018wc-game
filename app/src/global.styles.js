import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

export default () => injectGlobal`
  ${styledNormalize}
  html {
    height: 100%;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto Mono", sans-serif;
    height: 100%;
  }
  
  #root {
    height: 100%;
  }
`
