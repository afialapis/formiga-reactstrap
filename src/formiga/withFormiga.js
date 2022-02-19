import React from 'react'
import {useInput} from 'formiga'

const withFormiga = BaseComponent => {
  
  const _withFormiga = (props) => {
    const [inputRef, valid, message, setValidity]= useInput(props)

    return (
      <BaseComponent {...props}
                    valid       = {valid}
                    message     = {message}
                    inputRef    = {inputRef}
                    setValidity = {setValidity}/>
    )
  }

  return _withFormiga
}


export {withFormiga}