import React from 'react'
import {InputGroupText} from 'reactstrap'
import FIcon from '../../../../commons/icons/FIcon.mjs'

const FISSAction = (props) => {
  const {readOnly, clearable, value,
         creating, onCreate, onClear, shownText
         } = props
  
  //const enabled= (value!='' && value!=undefined && !readOnly) 
  const enabled= (shownText!='' && !readOnly) 

  return (
    <>
      { creating && 
        <InputGroupText onClick  = {(ev) => onCreate(ev)}
                        style    = {{cursor: 'pointer'}}>
          <FIcon icon="plus"
                  color="#28a745"/>
        </InputGroupText>
      }
    
      {clearable &&
        <InputGroupText
                    onClick  = {(ev) => {enabled ? onClear(ev) : null}}
                    style    = {{cursor:enabled ? 'pointer' : 'not-allowed',
                                  opacity: enabled ? 1 : 0.5}}>
          <FIcon icon="cross"/>
        </InputGroupText>
      }
    </>
  )
}



export default FISSAction