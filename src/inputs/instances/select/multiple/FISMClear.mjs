import React from 'react'
import {InputGroupText} from 'reactstrap'
import FIcon from '../../../../commons/icons/FIcon.mjs'


const FISMClear = (props) => {

  const { value, readOnly, onClear} = props
  const is_clearable= (value!=undefined && value.length>0 && !readOnly) 
  
  return (
    <InputGroupText
                  onClick  = {(ev) => {is_clearable ? onClear(ev) : null}}
                  style    = {{cursor:is_clearable ? 'pointer' : 'not-allowed',
                                opacity: is_clearable ? 1 : 0.5}}>
        <FIcon icon="cross"/>
    </InputGroupText>
  )
}

export default FISMClear
