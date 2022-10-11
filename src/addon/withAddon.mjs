import React from 'react'
import {VInputAddon}  from './VInputAddon.mjs'

const withAddon = BaseComponent => {
  
  const _withAddon = (props) => {

    let {name, 
         label, description, feedback, message, icon, 
         keepHeight, showValidity,
        valid, inline,  formGroupStyle, 
        inputGroupStyle, middleElement, value, defaultValue, bsSize} = props
    
    const showValidProps = (showValidity==1 || showValidity==4)
      ? {valid: valid, invalid: ! valid}
      : {}

    return (
      <VInputAddon name           = {name}
                   label          = {label}
                   description    = {description}
                   feedback       = {feedback||message}
                   value          = {value===undefined ? defaultValue : value}
                   icon           = {icon}
                   showValidity   = {showValidity}
                   isValid        = {valid}
                   inline         = {inline}
                   keepHeight     = {keepHeight}
                   formGroupStyle = {formGroupStyle}
                   inputGroupStyle= {inputGroupStyle}
                   middleElement  = {middleElement}
                   bsSize         = {bsSize}>

        <BaseComponent {...props}
                   showValidProps = {showValidProps}/>
        
      </VInputAddon>
    )
  }

  return _withAddon
}


export {withAddon}