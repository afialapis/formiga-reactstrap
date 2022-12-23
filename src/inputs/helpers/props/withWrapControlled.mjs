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

  const _withWrapControlled = (props) => {
    
    const {value, defaultValue, onChange}= props

    const controlledRef= useRef(isControlled(props))
    const controlled = controlledRef.current===true

    const initialValue = useRef(controlled ? value : defaultValue)
    
    const [innerValue, setInnerValue]= useState(_parseDef(controlled ? value : defaultValue))
  
    useEffect(() => {
      const nInnerValue= controlled ? value : defaultValue
      setInnerValue(_parseDef(nInnerValue))
    }, [value, defaultValue, controlled])
    
    const setValue = useCallback((newValue, confirmed, event) => {
      setInnerValue(_parseDef(newValue))
  
      if (onChange!=undefined) {
        onChange(newValue, confirmed, event)
      }      
    }, [setInnerValue, onChange])
    
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
