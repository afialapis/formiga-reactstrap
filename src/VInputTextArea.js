import React       from 'react'
import VInputText from './VInputText'

const VInputTextArea = (props) =>

  <VInputText {...props}
                inputType = {"textarea"}/>

VInputTextArea.propTypes = VInputText.propTypes

delete VInputTextArea.propTypes['inputType']

VInputTextArea.defaultProps = {
  ...VInputText.defaultProps,
  icon: 'text'
}



export default VInputTextArea