import React      from 'react'
import FInputText from './FInputText.mjs'

const FInputEmail = (props) =>

  <FInputText {...props}
                inputType = {"email"}/>

FInputEmail.propTypes = FInputText.propTypes

delete FInputEmail.propTypes['inputType']

FInputEmail.defaultProps = {
  ...FInputText.defaultProps,
  icon: 'email',
  label: 'E-Mail'
}



export default FInputEmail