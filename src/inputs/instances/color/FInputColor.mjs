import React, {useCallback}      from 'react'
import PropTypes  from 'prop-types'
import {useInput} from 'formiga'
import {Input}    from 'reactstrap'
import {inputPropTypes}    from '../../props/inputPropTypes.mjs'
import {inputDefaultProps} from '../../props/inputDefaultProps.mjs'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'


const _FInputColor = (props) => {
  const {id, name, placeholder, 
    readOnly, required,
    autocomplete, inputStyle, showValidity, bsSize, value, setValue} = props
  
  const input = useInput({...props})
  
  const showValidProps = (showValidity==1 || showValidity==4)
    ? {valid: input.valid, invalid: ! input.valid}
    : {}

  const handleChange = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, false, event)
  }, [setValue])

  const handleInput = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, true, event)
  }, [setValue])
      

  return (
    <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>

      <Input  id          = {id}
              name        = {name}
              innerRef    = {input.ref}
              type        = {"color"}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              bsSize      = {bsSize}
              value       = {value}
              onChange    = {handleChange}
              onInput     = {handleInput}
              {...showValidProps}
      />
    </FInputAddon>
  )
}

const FInputColor = withWrapControlled(_FInputColor)

FInputColor.propTypes = {
  ...inputPropTypes,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

FInputColor.defaultProps = {
  ...inputDefaultProps,
  icon: 'color'
}



export default FInputColor