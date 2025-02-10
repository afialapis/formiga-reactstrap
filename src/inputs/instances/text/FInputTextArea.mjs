import React      from 'react'
import FInputText from './FInputText.mjs'

const FInputTextArea = ({icon= 'text', ...props}) =>

  <FInputText {...props}
    icon = {icon}
    inputType = {"textarea"}/>


export default FInputTextArea