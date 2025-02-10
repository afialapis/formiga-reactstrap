import React from 'react'
import {Input} from 'reactstrap'

const FISSInput = (props) => {
  const {name, placeholder, readOnly, autocomplete, required,
         inputStyle, showValidity= 4, bsSize,
         valid, filterRef, shownText, onSearchStart, onSearchType, onKeyDown
         } = props
  
  return (                    
    <Input    name        = {`input_select_search_${name}_text`}
              className   = {`formiga-reactstrap-select-search-text custom-select ${bsSize!=undefined ? 'custom-select-'+bsSize : ''}`}
              type        = "text"
              innerRef    = {filterRef}
              value       = {shownText}
              placeholder = {placeholder}
              readOnly    = {readOnly}
              required    = {required}
              onClick     = {onSearchStart}
              onChange    = {onSearchType}
              onKeyDown   = {onKeyDown}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              bsSize      = {bsSize}
              {... (showValidity==1 || showValidity==4)
                ? {valid: valid, invalid: ! valid}
                : {}}
              />
  )
}

export default FISSInput