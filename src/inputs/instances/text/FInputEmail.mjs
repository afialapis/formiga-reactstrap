import React      from 'react'
import FInputText from './FInputText.mjs'

const FInputEmail = ({icon= 'email', label= 'E-Mail', ...props}) =>

  <FInputText {...props}
              icon = {icon}
              label= {label}
              inputType = {"email"}/>

export default FInputEmail