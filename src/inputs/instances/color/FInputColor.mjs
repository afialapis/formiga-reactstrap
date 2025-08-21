import React, {useCallback}      from 'react'
import {Input}    from 'reactstrap'
import useInputWrap from '../../helpers/useInputWrap.mjs'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'
import useValidProps from '../../helpers/valid/useValidProps.mjs'

const FInputColorBase = (props) => {
  const {id, name, placeholder, 
    readOnly, required,
    autocomplete, inputStyle, showValidity, bsSize, value, setValue, icon= 'color'} = props
  
  const input = useInputWrap(props)
  
  const showValidProps = useValidProps(input, showValidity)

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
                 input   = {input}>

      <Input  id          = {id}
              name        = {name}
              innerRef    = {input.ref}
              type        = {"color"}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              autoComplete= {autocomplete}
              style       = {{
                ...inputStyle||{},
                ...(bsSize==undefined 
                   ? {} 
                   : {height: bsSize=='sm'
                              ? '31px' : 
                              bsSize=='lg'
                              ? '48px' : '38px'})
              }} 
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