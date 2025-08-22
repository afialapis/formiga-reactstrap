import React, {useCallback}        from 'react'
import {Input}      from 'reactstrap'
import useInputWrap from '../../helpers/useInputWrap.mjs'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'
import useValidProps from '../../helpers/valid/useValidProps.mjs'


const FInputTextBase = (props) => {
  const {id, name, inputType= 'text',
        maxLength, minLength, 
        placeholder, readOnly, disabled,
        required, 
        autocomplete, inputStyle, showValidity, bsSize,
      value, setValue, icon= 'text'} = props         
  
  const input = useInputWrap(props)
  
  const handleChange = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, false, event)
  }, [setValue])

  const handleBlur = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, true, event)
  }, [setValue])

  const showValidProps = useValidProps(input, showValidity)

  return (
    <FInputAddon {...props}
                  icon = {icon}
                  input   = {input}>

      <Input  id          = {id}
              name        = {name}
              innerRef    = {input.ref}
              type        = {inputType || "text"}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly}
              disabled    = {disabled}
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

const FInputText = withWrapControlled(FInputTextBase, (v) => v || '')


export default FInputText