import React, {useRef, useState, useEffect, useCallback} from 'react'
import isControlled from './isControlled.mjs'

const withWrapControlled = (BaseComponent) => {
  
  const _withWrapControlled = (props) => {
    const controlled= isControlled(props)
    const {value, defaultValue, onChange}= props

    const initialValue = useRef(controlled ? value : defaultValue)
    
    const [innerValue, setInnerValue]= useState(controlled ? value : defaultValue)
  
    useEffect(() => {
      const nInnerValue= controlled ? value : defaultValue
      setInnerValue(nInnerValue)
    }, [value, defaultValue, controlled])
    
    const setValue = useCallback((newValue, confirmed, event) => {
      //console.log('withWrapControlled.setValue ' + newValue)
      setInnerValue(newValue)
  
      if (onChange!=undefined) {
        onChange(newValue, confirmed, event)
      }      
    }, [setInnerValue, onChange])
    

    //console.log(`withWrapControlled value ${value} defValue ${defaultValue} innerValue ${innerValue}`)
    
    return (
      <BaseComponent 
          {...props}
          initialValue = {initialValue.current}
          value        = {innerValue}
          setValue     = {setValue}
      />
    )
  }

  return _withWrapControlled
}


export default withWrapControlled
