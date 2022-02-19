import React        from 'react'
import VInputText from './VInputText'

/*
https://justmarkup.com/articles/2012-12-28-input-url/
*/

const VInputUrl = (props) =>

  <VInputText {...props}
                inputType = {"text"}/>

VInputUrl.propTypes = VInputText.propTypes

delete VInputUrl.propTypes['inputType']

VInputUrl.defaultProps = {
  ...VInputText.defaultProps,
  icon   : 'url',
  label  : 'URL',
  pattern: "^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z/]{2,6}$"
}



export default VInputUrl