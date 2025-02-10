import React, {useCallback}      from 'react'
import {useInput} from 'formiga'
import {Input}    from 'reactstrap'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import FITClear from './FITClear.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'

const FInputTimeBase = (props) => {
  const {id, name, 
    placeholder, readOnly, 
    required, step= 60, min, max,
    autocomplete, inputStyle, showValidity= 4, bsSize, 
    value, setValue, icon= 'time'} = props      

  const input = useInput({...props})

  const handleChange = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, true, event)
  }, [setValue])

  const handleClear = useCallback((event) => {
    setValue(undefined, true, event)
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
                type        = {"time"}
                placeholder = {placeholder || ""}
                readOnly    = {readOnly!=undefined ? readOnly  : false}
                required    = {required}
                autoComplete= {autocomplete}
                style       = {inputStyle} 
                bsSize      = {bsSize}
                value       = {value}
                onChange    = {handleChange}
                step        = {step}
                min         = {min}
                max         = {max}
                {...showValidProps}
      />

      <FITClear {...props}
                onClear = {handleClear}/>
    </FInputAddon>
  )
}

const FInputTime = withWrapControlled(FInputTimeBase, (v) => v || '')


export default FInputTime