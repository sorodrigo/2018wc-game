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
    height: 100%
  }
  
  .popup-content {
    width: auto !important;
    border: 0 !important;
    box-shadow: 0 2px 10px rgba(0,0,0,.15);
  }

  * {
    box-sizing: border-box;
  }
`
