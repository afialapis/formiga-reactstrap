import React      from 'react'
import FInputText from './FInputText.mjs'

/*
https://justmarkup.com/articles/2012-12-28-input-url/
*/

const FInputUrl = (props) =>

  <FInputText {...props}
                inputType = {"text"}/>

FInputUrl.propTypes = FInputText.propTypes

delete FInputUrl.propTypes['inputType']

FInputUrl.defaultProps = {
  ...FInputText.defaultProps,
  icon   : 'url',
  label  : 'URL',
  pattern: "^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z/]{2,6}$"
}



export default FInputUrl