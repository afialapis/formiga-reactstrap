import React, {useState, useEffect, useCallback}     from 'react'
import {useInput} from 'formiga'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'

const _makeId = (id, name) => {
  return id!=undefined 
         ? id
         : name !=undefined
           ? `formiga-reactstrap-checkbox-${name}`
           : `unique_value_here_please`
}



const FInputCheckboxBase = (props) => {
  const {value, setValue, icon= 'checkmark',
         inputStyle, bsSize, showValidity= 4, readOnly, required, id, name, checkboxLabel} = props
  
  const input = useInput({...props})
  const [inputId, setInputId]= useState(_makeId(id, name))

  useEffect(() => {
    setInputId(_makeId(id, name))
  }, [id, name])

  const handleChange = useCallback((event) => {
    const nValue= event.target.checked

    setValue(nValue, true, event)

  }, [setValue])  


  return (    
    <FInputAddon {...props}
                 icon    = {icon}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>

        <div className    = {`custom-switch custom-control `}
          /* better styling on the div, it is not very useful on the input here */
          style        = {inputStyle} > 
          <input type     = "checkbox" 
                 id       = {inputId} 
                 name     = {name} 
                 className= {`custom-control ${bsSize!=undefined ? 'custom-control-'+bsSize : ''} custom-control-input ${(showValidity==1 || showValidity==4) ? input.valid ? 'is-valid' : 'is-invalid' : ''}`}
                 ref      = {input.ref}
                 disabled = {readOnly!=undefined ? readOnly  : false}
                 required = {required}
                 checked  = {value}
                 onChange = {handleChange}
          />
          <label className="custom-control-label"
                  htmlFor={inputId}>{checkboxLabel}</label>
        </div>            
    </FInputAddon>
  )
}

const FInputCheckbox = withWrapControlled(FInputCheckboxBase)

export default FInputCheckbox
