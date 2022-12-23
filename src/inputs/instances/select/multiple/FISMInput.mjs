import React from 'react'
import {Input}    from 'reactstrap'


const FISMInput = (props) => {
  const {id, name, 
         placeholder, readOnly, autocomplete, required,
         inputStyle, bsSize, showValidity,
         value, valid, inputRef, onInputChange, enabledOptions, theSize} = props

  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: valid, invalid: ! valid}
  : {}

  const forceStyle = (showValidity==1 || showValidity==4)
  ? {backgroundImage: valid ? "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\")"
                            : "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\")",
     backgroundSize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)"}
  : {}

  return (
    <Input    id          = {id}
              name        = {name}
              type        = "select"
              className   = {`custom-select ${bsSize!=undefined ? 'custom-select-'+bsSize : ''}`}
              multiple
              innerRef    = {{current: inputRef}}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              autoComplete= {autocomplete}
              style       = {{...inputStyle, ...forceStyle}}
              bsSize      = {bsSize}
              size        = {theSize}
              value       = {value}
              onChange    = {onInputChange}
              {...showValidProps}
              >
      {enabledOptions.map((opt) => 
        <option key={`${name}_option_${opt.value}`}
                value={opt.value}
                disabled={opt.disabled}
                >
          {opt.label}
        </option>
      )}
    </Input>
  )
}


export default FISMInput