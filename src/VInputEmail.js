import React       from 'react'
import VInputText from './VInputText'

const VInputEmail = (props) =>

  <VInputText {...props}
                inputType = {"email"}/>

VInputEmail.propTypes = VInputText.propTypes

delete VInputEmail.propTypes['inputType']

VInputEmail.defaultProps = {
  ...VInputText.defaultProps,
  icon: 'email',
  label: 'E-Mail'
}



export default VInputEmail