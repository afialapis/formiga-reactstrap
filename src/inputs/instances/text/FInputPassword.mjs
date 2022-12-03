import React      from 'react'
import FInputText from './FInputText.mjs'

const FInputPassword = (props) =>

  <FInputText {...props}
                inputType = {"password"}/>

FInputPassword.propTypes = FInputText.propTypes

delete FInputPassword.propTypes['inputType']


FInputPassword.defaultProps = {
  ...FInputText.defaultProps,
  icon: 'password',
  label: 'Password'
}

export default FInputPassword