import React      from 'react'
import FInputText from './FInputText.mjs'

const FInputPassword = ({icon= 'password', label= 'Password', ...props}) =>

  <FInputText {...props}
    icon = {icon}
    label= {label}
    inputType = {"password"}/>

export default FInputPassword