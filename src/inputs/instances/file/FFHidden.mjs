import React from 'react'

const FFHidden = (props) => {
  const {id, name, readOnly, 
         required, accept, bsSize,
         onChange, hasValue, input/*, value*/} = props
  
  return (
    <input  style       = {{zIndex: "0", display: "inline", opacity: "0", visibility: "hidden"}}
            id          = {id}
            name        = {name}
            // Do not lose the form-control class
            // TODO maybe open PR on reactstrap?
            className   = {`form-control ${bsSize!=undefined ? 'form-control-'+bsSize : ''}`}
            ref         = {input.ref}
            type        = {"file"}
            //value       = {value}
            onChange    = {onChange}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            // If we receive some value on initing,
            // we have no way to assign it to this input (file are readonly)
            // So we hack this.
            // TODO Would be better to use maybe another type of hidden input,
            // keeping the <file> just for the file upload.
            required    = {required && !hasValue}
            //valid       = {valid ? 'true' : 'false'}
            //invalid     = {!valid ? 'true' : 'false'}
            accept      = {accept}
    />
  )
}


export default FFHidden