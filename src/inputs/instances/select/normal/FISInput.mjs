import React from 'react'
import {Input} from 'reactstrap'
import { useValidClassnames } from '../../../helpers/useValidClassnames.mjs'
import { makeId } from '../../../helpers/props/makeId.mjs'


const FISInput = (props) => {

  const { id, name, 
          placeholder, readOnly, autocomplete, required, 
          options, 
          inputStyle, clearable, showValidity, bsSize,
          value, valid, inputRef, onInputChange, enabledOptions} = props

  const [className]= useValidClassnames(valid, showValidity)

  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: valid, invalid: ! valid}
  : {}

  return (
    <Input    
              id          = {id || makeId(options)}
              name        = {name}
              type        = "select"
              className   = {className}
              innerRef    = {inputRef}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              value       = {value}
              bsSize      = {bsSize}
              onChange    = {onInputChange}
              {...showValidProps}
              >
      {clearable && enabledOptions.filter((opt) => opt.value=='').length==0
        ?  <option key       = {`${name}_option_empty`}
                  value     = {''}>
          {''}
        </option>
        : null}
      {enabledOptions.map((opt) => 
        <option key       = {`${name}_option_${opt.value}`}
                value     = {opt.value}
                {...opt.disabled ? {disabled: true} : {}}
                >
          {opt.label}
        </option>
      )}
      {clearable
        ? <option style={{display: "none"}} value=""></option>
        : null}
    </Input>
  )
}


export default FISInput