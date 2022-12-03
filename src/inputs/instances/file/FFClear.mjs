import React from 'react'
import FIcon                  from '../../../commons/icons/FIcon.mjs'
import {InputGroupText}       from 'reactstrap'

const FFClear = ({hasValue, onClear}) => {
  return (
    <InputGroupText 
      onClick   = {hasValue 
                    ? (ev) => onClear(ev) 
                    : () => {}
                    }
      style     = {{cursor: hasValue ? 'pointer' : 'not-allowed', zIndex: "2",
                    opacity:hasValue ? 1 : 0.5}}>
      <FIcon icon="cross"/>
    </InputGroupText>
  )
}

export default FFClear
