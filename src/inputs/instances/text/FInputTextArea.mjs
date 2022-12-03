import React      from 'react'
import FInputText from './FInputText.mjs'

const FInputTextArea = (props) =>

  <FInputText {...props}
                inputType = {"textarea"}/>

FInputTextArea.propTypes = FInputText.propTypes

delete FInputTextArea.propTypes['inputType']

FInputTextArea.defaultProps = {
  ...FInputText.defaultProps,
  icon: 'text'
}



export default FInputTextArea