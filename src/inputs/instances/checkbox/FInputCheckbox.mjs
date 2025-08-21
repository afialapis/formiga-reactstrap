import React, {useState, useEffect, useCallback}     from 'react'
import {Input} from 'reactstrap'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'
import getValidClassnames from '../../helpers/valid/getValidClassnames.mjs'
import useInputWrap from '../../helpers/useInputWrap.mjs'

const _makeId = (id, name) => {
  return id!=undefined 
         ? id
         : name !=undefined
           ? `formiga-reactstrap-checkbox-${name}`
           : `unique_value_here_please`
}



const FInputCheckboxBase = (props) => {

  const {value, setValue, icon= 'checkmark',
         inputStyle, bsSize, showValidity, readOnly, required, id, name, checkboxLabel} = props
  
  const input = useInputWrap(props)
  const [inputId, setInputId]= useState(_makeId(id, name))

  useEffect(() => {
    setInputId(_makeId(id, name))
  }, [id, name])

  const handleChange = useCallback((event) => {
    const nValue= event.target.checked

    setValue(nValue, true, event)

  }, [setValue])  

  const validClassName = getValidClassnames(input, showValidity)
  
  return (    
    <FInputAddon {...props}
                 icon    = {icon}
                 input   = {input}
                 formGroupProps={{switch: true}}
                 inputGroupStyle={{height: bsSize=='lg' ? '48px' : bsSize=='sm' ? '31px' : '38px'}}>

        <div className    = {`custom-switch custom-control `}
          /* better styling on the div, it is not very useful on the input here */
          style        = {inputStyle} > 
          <Input type     = "switch" 
                 id       = {inputId} 
                 name     = {name} 
                 className= {`custom-control ${bsSize!=undefined ? 'custom-control-'+bsSize : ''} custom-control-input ${validClassName}`}
                 innerRef = {input.ref}
                 disabled = {readOnly!=undefined ? readOnly  : false}
                 required = {required}
                 checked  = {value}
                 onChange  = {handleChange}
          />
          <div className="custom-control-label"
                >{checkboxLabel}</div>
        </div>            
    </FInputAddon>
  )
}

const FInputCheckbox = withWrapControlled(FInputCheckboxBase)

export default FInputCheckbox
