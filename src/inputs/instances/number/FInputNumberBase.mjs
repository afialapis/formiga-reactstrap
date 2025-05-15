import React, {useRef, useCallback, useState, useEffect}  from 'react'
import {useInput} from 'formiga'
import {Input, InputGroupText}     from 'reactstrap'
import {FInputAddon}  from '../../addon/FInputAddon.mjs'
import Icon from '../../../commons/icons/FIcon.mjs'
import {useInputFilter} from 'formiga'
import useStepOrDecimals from '../../helpers/props/useStepOrDecimals.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'
import roundFloat from '../../helpers/float/roundFloat.mjs'
import countDecimals from '../../helpers/float/countDecimals.mjs'
import isNotNumber from '../../helpers/float/isNotNumber'

const wrappedCheckValue = (props, value) => {
  if (props.checkValue!=undefined) {
    if (!props.checkValue(value)) {
      return false
    }
  }
  if (props.gt!=undefined) {
    if (value<= props.gt) {
      return false
    }
  }
  if (props.lt!=undefined) {
    if (value>= props.lt) {
      return false
    }
  }
  return true
}


const FInputNumberBase = (props) => {
  const {value, setValue,
         id, name, placeholder, 
         readOnly, required, min, max, step, decimals,
         autocomplete, t, inputFilter,
         inputStyle, showArrows= true, showValidity= 4, bsSize}= props

  const reprRef = useRef(undefined)
  const [innerRepr, setInnerRepr]= useState(t.from(value))
  const stepOrDecimals = useStepOrDecimals(step, decimals)

  const input= useInput({
    ...props,
    checkValue: (v) => wrappedCheckValue(props, t.to(v))
  })

  useInputFilter(reprRef?.current, inputFilter)


  const incrValue = useCallback((factor, confirmed) => {
    const curValue = isNotNumber(value) ? 0.0 : parseFloat(value)
    const incr= stepOrDecimals!=undefined
                ? parseFloat(stepOrDecimals)
                : 1.00
    const nValue= roundFloat(curValue + (parseFloat(factor)*incr), countDecimals(stepOrDecimals))
    const nRepr = t.from(nValue)

    //console.log(`incrValue() current ${typeof curValue} ${curValue} + incr ${typeof incr} ${incr} => ${typeof nValue} ${nValue} (repr: ${typeof nRepr} ${nRepr})`)

    setValue(nValue, confirmed)
    input.setValue(nValue)
    input.validate()
    setInnerRepr(nRepr)
  }, [value, setValue, stepOrDecimals, t, input])


  const handleChange = useCallback((event) => {
    const nRepr = event.target.value
    const nValue = t.to(nRepr)

    //console.log(`handleChange() => ${typeof nValue} ${nValue} (repr: ${typeof nRepr} ${nRepr})`)

    setValue(nValue, false, event)
    input.setValue(nValue)
    input.validate()
    setInnerRepr(nRepr)
  }, [setValue, t, input])


  const handleKeyDown = useCallback((event) => {
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      const factor = event.key=='ArrowUp' ? 1 : -1
      incrValue(factor, false)
    }
  }, [incrValue])


  const handleBlur = useCallback((event) => {
    const nRepr= event.target.value
    const nValue = t.to(nRepr)
    setValue(nValue, true, event)
  }, [setValue, t]) 

  useEffect(() => {
    // console.log(`FInputNumber => useEffect value ${value} repr ${t.from(value)}`)
    input.setValue(value)
    input.validate()
    setInnerRepr(t.from(value))    
  }, [value, t, input])

  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: input.valid, invalid: ! input.valid}
  : {}

  // console.log(`FInputNumber => value ${value} repr ${innerRepr}`)

  return (
    <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>

      <input  type         = "number"
              id           = {id}
              name         = {name}
              ref          = {input.ref}
              style        = {{display: "none"}}
              required     = {required}
              max          = {max}
              min          = {min}
              step         = {stepOrDecimals}
              defaultValue = {value}/>

      <Input  
              type         = {"text"}
              innerRef     = {reprRef}
              placeholder  = {placeholder || ""}
              readOnly     = {readOnly!=undefined ? readOnly  : false}
              autoComplete = {autocomplete}
              style        = {inputStyle} 
              onKeyDown    = {(ev) => handleKeyDown(ev)}
              value        = {innerRepr}
              onChange     = {handleChange}
              onBlur       = {handleBlur}
              bsSize       = {bsSize}
              {...showValidProps}
      />
      {showArrows
        ?  <div className={`formiga-reactstrap-input-number-addon ${readOnly ? 'read-only' : ''}`}>
            <InputGroupText className="formiga-reactstrap-input-number-incr"
                            onClick = {() => incrValue(-1, true)}>
              <Icon icon="minus"></Icon>
            </InputGroupText>
            <InputGroupText className="formiga-reactstrap-input-number-incr"
                            onClick  = {() => incrValue(1, true)}>
              <Icon icon="plus"></Icon>
            </InputGroupText>
          </div>  
        : null
      }      
    </FInputAddon>
  )
}

const FInputNumber = withWrapControlled(FInputNumberBase)

export default FInputNumber