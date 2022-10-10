import React       from 'react'
import VInputText from './VInputText.mjs'

const VInputPassword = (props) =>

  <VInputText {...props}
                inputType = {"password"}/>

VInputPassword.propTypes = VInputText.propTypes

delete VInputPassword.propTypes['inputType']


VInputPassword.defaultProps = {
  ...VInputText.defaultProps,
  icon: 'password',
  label: 'Password'
}

export default VInputPassword