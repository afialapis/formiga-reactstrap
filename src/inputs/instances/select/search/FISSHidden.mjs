import React from 'react'
import {Input} from 'reactstrap'

const FISSHidden = (props) => {
  const {id, name, required, value, inputRef} = props
  
  return (
    <Input    
      id          = {id}
      name        = {name}
      className   = "formiga-reactstrap-select-search-hidden"
      type        = "hidden"
      innerRef    = {{current: inputRef}}
      required    = {required}
      defaultValue= {value}
      />
  )
}



export default FISSHidden