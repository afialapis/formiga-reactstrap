import React, {useRef, useState, useEffect, useCallback} from 'react'
import isControlled from '../../helpers/props/isControlled.mjs'

const withWrapControlledForArray = (BaseComponent, eventName= 'onBlur') => {
  
  const _withWrapControlledForArray = (props) => {
    const controlled= isControlled(props)
    const {value, defaultValue, onChange}= props

    const initialValue = useRef(controlled ? value : defaultValue)
    
    const [innerValue, setInnerValue]= useState(controlled ? value : defaultValue)
  
    useEffect(() => {
      const nInnerValue= controlled ? value : defaultValue
      setInnerValue(nInnerValue)
    }, [value, defaultValue, controlled])
    
    const setValue = useCallback((newValue, confirmed, event) => {
      //console.log('withWrapControlledForArray.setValue ' + newValue)
      setInnerValue(newValue)
  
      if (onChange!=undefined) {
        onChange(newValue, confirmed, event)
      }      
    }, [setInnerValue, onChange])


    const handleChange = useCallback((event) => {
      //console.log('withWrapControlledForArray.handleChange')
      const newValue= event.target.value
      setValue(newValue, false, event)
    }, [setValue])
  
    const handleBlur = useCallback((event) => {
      //console.log('withWrapControlledForArray.handleBlur')
      const newValue= event.target.value
      setValue(newValue, true, event)
    }, [setValue])    

    //console.log(`withWrapControlledForArray value ${value} defValue ${defaultValue} innerValue ${innerValue}`)
    
    return (
      <BaseComponent 
          {...props}
          initialValue = {initialValue.current}
          value        = {Array.isArray(innerValue) ? innerValue : []}
          setValue     = {setValue}
          onChange     = {handleChange}
          {... 
            {[eventName]: handleBlur}
          }
      />
    )
  }

  return _withWrapControlledForArray
}


export default withWrapControlledForArray
