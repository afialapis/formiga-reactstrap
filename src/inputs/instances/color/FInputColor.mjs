import React, {useCallback}      from 'react'
import {useInput} from 'formiga'
import {Input}    from 'reactstrap'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'


const FInputColorBase = (props) => {
  const {id, name, placeholder, 
    readOnly, required,
    autocomplete, inputStyle, showValidity= 4, bsSize, value, setValue, icon= 'color'} = props
  
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
                 icon    = {icon}
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

const FInputColor = withWrapControlled(FInputColorBase)


export default FInputColor