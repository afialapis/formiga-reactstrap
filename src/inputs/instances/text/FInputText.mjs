import React, {useCallback}        from 'react'
import {useInput}   from 'formiga'
import {Input}      from 'reactstrap'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'


const FInputTextBase = (props) => {
  const {id, name, inputType= 'text',
        maxLength, minLength, 
        placeholder, readOnly, 
        required, 
        autocomplete, inputStyle, showValidity= 4, bsSize,
      value, setValue, icon= 'text'} = props         
  
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
                  icon = {icon}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>

      <Input  id          = {id}
              name        = {name}
              innerRef    = {input.ref}
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

const FInputText = withWrapControlled(FInputTextBase, (v) => v || '')


export default FInputText