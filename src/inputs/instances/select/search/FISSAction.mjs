import React from 'react'
import {InputGroupText} from 'reactstrap'
import FIcon from '../../../../commons/icons/FIcon.mjs'

const FISSAction = (props) => {
  const {readOnly, clearable, /*value,*/
    creatable, creating, onCreate, onClear, shownText
         } = props
  
  //const enabled= (value!='' && value!=undefined && !readOnly) 
  const enabled= (shownText!='' && !readOnly) 

  return (
    <>
      { creatable && 
        <InputGroupText onClick  = {creating ? (ev) => onCreate(ev) : null}
                        style    = {{cursor: creating ? 'pointer' : 'not-allowed',
                                    opacity: creating ? 1 : 0.5}}>
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