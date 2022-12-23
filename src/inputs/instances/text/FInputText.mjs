import React, {useCallback}        from 'react'
import PropTypes    from 'prop-types'
import {useInput}   from 'formiga'
import {Input}      from 'reactstrap'
import {inputPropTypes}    from '../../props/inputPropTypes.mjs'
import {inputDefaultProps} from '../../props/inputDefaultProps.mjs'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'


const _FInputText = (props) => {
  const {id, name, inputType,
        maxLength, minLength, 
        placeholder, readOnly, 
        required, 
        autocomplete, inputStyle, showValidity, bsSize,
      value, setValue} = props         
  
  const input = useInput({...props})
  
  const handleChange = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, false, event)
  }, [setValue])

  const handleBlur = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, true, event)
  }, [setValue])

  const showValidProps = (showValidity==1 || showValidity==4)
    ? {valid: input.valid, invalid: ! input.valid}
    : {}

  return (
    <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>

      <Input  id          = {id}
              name        = {name}
              innerRef    = {{current: input.ref}}
              type        = {inputType || "text"}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              maxLength   = {maxLength}
              minLength   = {minLength}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              bsSize      = {bsSize}
              value       = {value}
              onChange    = {handleChange}
              onBlur      = {handleBlur}
              {...showValidProps}/>
    </FInputAddon>
   )
}

const FInputText = withWrapControlled(_FInputText, (v) => v || '')

FInputText.propTypes = {
  ...inputPropTypes,

  inputType    : PropTypes.string,
  placeholder  : PropTypes.string,
  maxLength    : PropTypes.number,
  minLength    : PropTypes.number,
  inputFilter  : PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(RegExp), PropTypes.string]),
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

FInputText.defaultProps = {
  ...inputDefaultProps,
  icon: 'text',
  inputType: 'text',
  placeholder: ''
}


export default FInputText