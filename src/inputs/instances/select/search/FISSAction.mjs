import React from 'react'
import {InputGroupText} from 'reactstrap'
import FIcon from '../../../../commons/icons/FIcon.mjs'

const FISSAction = (props) => {
  const {readOnly, clearable, value,
         creating, onCreate, onClear
         } = props
  

  const is_clearable= (value!='' && value!=undefined && !readOnly) 

  if (creating) {
    return (

      <InputGroupText onClick  = {(ev) => onCreate(ev)}
                      style    = {{cursor: 'pointer'}}>
        <FIcon icon="plus"
                color="#28a745"/>
      </InputGroupText>
    )
  }
  
  if (clearable) {
    return (
      <InputGroupText
                  onClick  = {(ev) => {is_clearable ? onClear(ev) : null}}
                  style    = {{cursor:is_clearable ? 'pointer' : 'not-allowed',
                                opacity: is_clearable ? 1 : 0.5}}>
        <FIcon icon="cross"/>
      </InputGroupText>
    )
  }

  return null

}



export default FISSAction