import React from 'react'

const FFSHidden = (props) => {
  const {id, name, required, inputRef, defaultValue} = props
  
  return (
    <input  
      type         = "text"
      id           = {id}
      name         = {name}
      ref          = {inputRef}
      style        = {{display: "none"}}
      required     = {required}
      defaultValue = {defaultValue}/>
  )
}




export default FFSHidden