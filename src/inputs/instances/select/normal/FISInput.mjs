import React from 'react'
import {Input} from 'reactstrap'
import getValidClassnames from '../../../helpers/valid/getValidClassnames.mjs'
import useValidProps from '../../../helpers/valid/useValidProps.mjs'
import { makeId } from '../../../helpers/props/makeId.mjs'

const FISInput = (props) => {

  const { id, name, 
          placeholder, readOnly, autocomplete = 'off', required, 
          options, 
          inputStyle, clearable, showValidity, bsSize,
          value, input, inputRef, onInputChange, enabledOptions} = props

  const className= `custom-select ${bsSize!=undefined ? 'custom-select-'+bsSize : ''} ${getValidClassnames(input, showValidity)}`

  const showValidProps = useValidProps(input, showValidity)

  const selectOptions = enabledOptions.map((opt) => 
    <option key       = {`${name}_option_${opt.value}`}
            value     = {opt.value}
            {...opt.disabled ? {disabled: true} : {}}
            >
      {opt.label}
    </option>
  )
  
  return (
    <Input    
              id          = {id || makeId(options)}
              name        = {name}
              type        = "select"
              className   = {className}
              innerRef    = {inputRef}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly}
              required    = {required}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              value       = {value}
              bsSize      = {bsSize}
              onChange    = {onInputChange}
              {...showValidProps}
              >
      {clearable && enabledOptions.filter((opt) => opt.value=='').length==0
        ?  <option key    = {`${name}_option_empty`}
                   value  = {''}>
          {''}
        </option>
        : null}
      {selectOptions}
      
    </Input>
  )
}


export default FISInput