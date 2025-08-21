import React from 'react'
import {Input} from 'reactstrap'
import useValidProps from '../../../helpers/valid/useValidProps.mjs'

const FISSInput = (props) => {
  const {name, placeholder, readOnly, autocomplete = 'off', required,
         inputStyle, showValidity, bsSize,
         input, filterRef, shownText, onSearchStart, onSearchType, onKeyDown
         } = props
  
  const showValidProps = useValidProps(input, showValidity)
  
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
              {... showValidProps}
              />
  )
}

export default FISSInput