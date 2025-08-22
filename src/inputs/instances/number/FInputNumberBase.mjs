import React, {useRef, useCallback, useState, useEffect}  from 'react'
import useInputWrap from '../../helpers/useInputWrap.mjs'
import {Input, InputGroupText}     from 'reactstrap'
import {FInputAddon}  from '../../addon/FInputAddon.mjs'
import Icon from '../../../commons/icons/FIcon.mjs'
import {useInputFilter} from 'formiga'
import useStepOrDecimals from '../../helpers/props/useStepOrDecimals.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'
import roundFloat from '../../helpers/float/roundFloat.mjs'
import countDecimals from '../../helpers/float/countDecimals.mjs'
import isNotNumber from '../../helpers/float/isNotNumber'
import useValidProps from '../../helpers/valid/useValidProps.mjs'

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
         readOnly, disabled, required, min, max, step, decimals,
         autocomplete, t, inputFilter,
         inputStyle, showArrows= true, showValidity, bsSize}= props

  const reprRef = useRef(undefined)
  const [innerRepr, setInnerRepr]= useState(t.from(value))
  const stepOrDecimals = useStepOrDecimals(step, decimals)

  const input= useInputWrap(props, {
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

    // console.log(`handleChange() => ${typeof nValue} ${nValue} (repr: ${typeof nRepr} ${nRepr})`)

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
    const lastChar = innerRepr.slice(-1)
    if (! (lastChar==',' || lastChar=='.')) {
      const nRepr = t.from(value)
      // console.log(`FInputNumber => useEffect value ${value} repr ${nRepr}`)
      setInnerRepr(nRepr)
      input.setValue(value)
      input.validate()
    }
  }, [value, t, input, innerRepr])

  const showValidProps = useValidProps(input, showValidity)

  // console.log(`FInputNumber => value ${value} repr ${innerRepr}`)

  return (
    <FInputAddon {...props}
                 input   = {input}>

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
              readOnly     = {readOnly}
              disabled     = {disabled}
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