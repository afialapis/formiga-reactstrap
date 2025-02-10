import React      from 'react'
import FInputText from './FInputText.mjs'

/*
https://justmarkup.com/articles/2012-12-28-input-url/
*/

const _URL_PATT = "^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z/]{2,6}$"

const FInputUrl = ({icon= 'url', label= 'URL', pattern= _URL_PATT, ...props}) =>

  <FInputText {...props}
    icon = {icon}
    label= {label}
    pattern = {pattern}
    inputType = {"text"}/>

export default FInputUrl