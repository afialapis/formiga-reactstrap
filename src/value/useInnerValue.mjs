import {useRef, useState, useEffect} from 'react'
import isControlled from '../helpers/isControlled.mjs'

const useInnerValue = (props) => {
  const controlled= isControlled(props)
  const {value, defaultValue}= props

  const initialValue = useRef(controlled ? value : defaultValue)
  
  const [innerValue, setInnerValue]= useState(controlled ? value : defaultValue)

  useEffect(() => {
    const nInnerValue= controlled ? value : defaultValue

    if (innerValue != nInnerValue) {
      setInnerValue(nInnerValue)
    }

  }, [innerValue, value, defaultValue, controlled])

  
  return [initialValue, innerValue, setInnerValue]
}


export {useInnerValue}