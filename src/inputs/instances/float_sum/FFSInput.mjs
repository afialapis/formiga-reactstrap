import React, {useState, useRef, useEffect, useCallback}  from 'react'
import {useInputFilter} from 'formiga'
import {Input}          from 'reactstrap'
import {FLT_FLOAT_BOTH} from '../../helpers/float/floatFilters.mjs'
import {fromFloat, toFloat} from './floatConv.mjs'
import roundFloat from '../../helpers/float/roundFloat.mjs'
import countDecimals from '../../helpers/float/countDecimals.mjs'

const _startsWithTrashZero = (s) => {
  if (! s) {
    return false
  }
  if (s.length <2) {
    return false
  }
  const firstIdx= s.slice(0, 1)=='-' ? 1 : 0
  if (s.slice(firstIdx, firstIdx+1)!='0') {
    return false
  }
  const nextIdx= firstIdx+1
  if (isNaN(s.slice(nextIdx, nextIdx+1))) {
    return false
  }
  return true
}

const FFSInput = (
  { className, placeholder, readOnly, valid, autocomplete, 
    inputStyle, stepOrDecimals, focusIt, showValidity, bsSize,
    sign, value, onChange, onAddValue, onRemValue, isLastOne, removable, decimalSign}) => {
  
  const reprRef = useRef(undefined)
  useInputFilter(reprRef?.current, FLT_FLOAT_BOTH)


  const [innerRepr, setInnerRepr]= useState(fromFloat(value, decimalSign, sign))

  useEffect(() => {
    if (focusIt) {
      reprRef.current.focus()
    }
  }, [focusIt])

  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: valid, invalid: ! valid}
  : {}


  const incrValue = useCallback((factor, confirmed) => {
    const curValue = toFloat(value)
    const incr= stepOrDecimals!=undefined
                ? parseFloat(stepOrDecimals)
                : 1.00
    const nValue= roundFloat(curValue + (parseFloat(factor)*incr), countDecimals(stepOrDecimals))
    const nRepr = fromFloat(nValue, decimalSign, sign)

    //console.log(`incrValue() current ${typeof curValue} ${curValue} + incr ${typeof incr} ${incr} => ${typeof nValue} ${nValue} (repr: ${typeof nRepr} ${nRepr})`)

    setInnerRepr(nRepr)
    onChange(nValue, confirmed)

  }, [value, onChange, stepOrDecimals, sign, decimalSign])

  const getInnerReprFromEvent = useCallback((event) => {
    let nRepr= event.target.value
    //console.log(`${innerRepr} ==> ${nRepr}`)
    if ( (nRepr!='') && (innerRepr=='-0') && (nRepr.indexOf('-')<0)) {
      nRepr= `-${nRepr}`
    }
    if (_startsWithTrashZero(nRepr)) {
      nRepr= nRepr.replace('0', '')
    }
    
    return nRepr
  }, [innerRepr])

  const handleChange = useCallback((event) => {
    const nRepr= getInnerReprFromEvent(event)
    setInnerRepr(nRepr)

    const nValue = toFloat(nRepr)
    onChange(nValue, false)

  }, [onChange, getInnerReprFromEvent])

  const handleKeyDown = useCallback((event) => {
    // Simulate natives number input up/down
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      const factor = event.key=='ArrowUp' ? 1 : -1
      incrValue(factor, false)
      return
    }

    // Only allow to add new fields if we are in the last input
    if ( event.key=='+' || event.key=='-') {
      if (isLastOne) {
        // // If value is positive and key is '-' and we are at the inputs beginning,
        // // means "change input's sign" instead of "add new"
        // let changeSign= false
        // if (event.key=='-' && event.target.value!='') {
        //   const f= parseFloat(event.target.value)
        //   if (f>0) {
        //     if (event.target.selectionStart==0) {
        //       changeSign= true
        //     }
        //   }
        // }
        // if (! changeSign) {
          const lastRepr= innerRepr.slice(-1)[0]
          if (lastRepr!='' && lastRepr!=',' && lastRepr!='.') {
            event.preventDefault()
            if (event.key=='+') {

              onAddValue(true)
            } else {
              onAddValue(false)
            }
          }
        //}
      }
    }
    
    if (event.key=='Backspace' && event.target.value.length<=1 && removable) {
      event.preventDefault()
      onRemValue()
    }

  }, [innerRepr, incrValue, isLastOne, onAddValue, onRemValue, removable])

   const handleBlur = useCallback((event) => {
    
    const nRepr= getInnerReprFromEvent(event)
    const nValue = toFloat(nRepr)

    onChange(nValue, true)

   }, [onChange, getInnerReprFromEvent])


  return (
    <Input  
        className    = {className}
        type         = {"text"}
        innerRef     = {reprRef}
        placeholder  = {placeholder || ""}
        readOnly     = {readOnly!=undefined ? readOnly  : false}
        autoComplete = {autocomplete}
        style        = {inputStyle} 
        size         = {Math.max(innerRepr.length || 0, 2)}
        value        = {innerRepr}
        onChange     = {handleChange}
        onKeyDown    = {handleKeyDown}
        onBlur       = {handleBlur}
        bsSize       = {bsSize}
        step         = {stepOrDecimals}
        {...showValidProps}
    />    
  )
}


export default FFSInput
