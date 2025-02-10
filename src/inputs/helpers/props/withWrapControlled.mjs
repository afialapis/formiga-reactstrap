import React, {useRef, useState, useEffect, useCallback} from 'react'
import isControlled from './isControlled.mjs'


const withWrapControlled = (BaseComponent, defGetter= undefined) => {
  
  const _parseDef = (v) => {
    if (defGetter==undefined) {
      return v
    }
    if (v!=undefined) {
      return v
    }

    return defGetter(v)
  }

  const useWrapControlled = (props) => {

    const {value, defaultValue, onChange}= props
    const controlledRef = useRef(isControlled(props))
    const initialValueRef = useRef(isControlled(props) ? value : defaultValue)
    
    
    const [innerValue, setInnerValue]= useState(_parseDef(isControlled(props) ? value : defaultValue))
  
    useEffect(() => {
      const nInnerValue= controlledRef.current ? value : defaultValue
      setInnerValue(_parseDef(nInnerValue))
    }, [value, defaultValue])
    
    const setValue = useCallback((newValue, confirmed, event) => {
      setInnerValue(_parseDef(newValue))
  
      if (onChange!=undefined) {
        onChange(newValue, confirmed, event)
      }      
    }, [onChange])
    
    return (
      <BaseComponent 
          {...props}
          initialValue = {initialValueRef.current}
          value        = {innerValue}
          setValue     = {setValue}
      />
    )
  }

  return useWrapControlled
}


export default withWrapControlled
