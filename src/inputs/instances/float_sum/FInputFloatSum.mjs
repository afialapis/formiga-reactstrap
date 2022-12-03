import React, {useCallback, useEffect, useState}  from 'react'
import PropTypes  from 'prop-types'
import {useInput} from 'formiga'
import {inputPropTypes}    from '../../props/inputPropTypes.mjs'
import {inputDefaultProps} from '../../props/inputDefaultProps.mjs'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import isNotNumber from '../../helpers/float/isNotNumber'

import useStepOrDecimals from '../../helpers/props/useStepOrDecimals.mjs'
import FFSHidden from './FFSHidden.mjs'
import FFSInput from './FFSInput.mjs'
import FFSTotal from './FFSTotal.mjs'
import withWrapControlledForArray from './withWrapControlledForArray.mjs'

const _getInputSigns = (value) => {
  if ((value==undefined) || (value.length==0)) {
    return []
  }
  return value.map(v => isNotNumber(v) ? true : v>=0)
}

const _FInputFloatSum = (props) => {
  const {id, name, value, setValue,
    placeholder, readOnly, 
    step, decimals, decimalSign,
    autocomplete, inputStyle, showValidity, bsSize} = props
  
  const stepOrDecimals = useStepOrDecimals(step, decimals)
  const input = useInput({
    ...props,
    // TODO
    // wrap this checks (as we save array in the hidden input):
    //      min, max, stepOrDecimals,
    //checkValue: (v) => true

    // transformValue,
    // allowedValues, 
    // disallowedValues, 
    // doRepeat, 
    // doNotRepeat, 
    // feedback
    decimals: undefined, 
    inputFilter: undefined
  })
  
  const [inputSigns, setInputsSigns]= useState(_getInputSigns(value))
  const [inputWithFocus, setInputWithFocus]= useState(0)
  
  useEffect(() => {
    input.setValue(value)
    input.validate()
  }, [input, value])

  // Add a new input and focus it
  // innerRepr must be handled in paralell
  const handleAddValue = useCallback((pos) => {
    
    const nValue= [...value]
    nValue.push(0.0)
    

    const nSigns= [...inputSigns]
    nSigns.push(pos)

    setValue(nValue, false)
    setInputsSigns(nSigns)
    setInputWithFocus(nValue.length-1)
  }, [value, setValue, inputSigns])

  // Remove an input's value and its repr
  // innerRepr must be handled in paralell  
  const handleRemValue = useCallback((iIndex) => {
    const nValue= value!=undefined
          ? [...value]
          : [0.0]
    nValue.splice(iIndex, 1)
    setValue(nValue, true)

    const nSigns= [...inputSigns]
    nSigns.splice(iIndex, 1)
    setInputsSigns(nSigns)

    setInputWithFocus(Math.max(iIndex-1, 0))
  }, [value, setValue, inputSigns])

  // Update an input's value and its repr
  // innerRepr must be handled in paralell
  const handleChange = useCallback((tValue, confirmed, iIndex) => {
    const nValue= [...value]
    if (nValue.length > iIndex) {
      nValue[iIndex]= tValue
    } else {
      nValue.push(tValue)
    }

    setValue(nValue, confirmed)
  }, [value, setValue])


  return (
    <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>

      <div className  = "formiga-reactstrap-float-sum">
        <FFSHidden {...props}
                   inputRef       = {input.ref}
                   defaultValue   = {value}/>
        
        {value.map((iValue, iIndex) => {
          const sign= inputSigns[iIndex]

          return (
            <div className={`formiga-reactstrap-float-sum-box ${ sign ? 'positive' : 'negative'}`}
                key      = {`formiga-reactstrap-float-sum-${id || name}-repr-${iIndex}`}>
    
              <FFSInput 
                      className     = "formiga-reactstrap-float-sum-input"
                      placeholder   = {placeholder || ""}
                      readOnly      = {readOnly!=undefined ? readOnly  : false}
                      valid         = {input.valid}
                      showValidity  = {showValidity}
                      autocomplete  = {autocomplete}
                      inputStyle    = {inputStyle} 
                      stepOrDecimals= {stepOrDecimals}
                      
                      focusIt       = {inputWithFocus==iIndex}
                      bsSize        = {bsSize}

                      value         = {iValue}
                      sign          = {sign}
                      decimalSign   = {decimalSign}

                      onChange      = {(v,c) => handleChange(v, c, iIndex)}
                      onAddValue    = {(pos) => handleAddValue(pos)}
                      onRemValue    = {( ) => handleRemValue(iIndex)}
                      isLastOne     = {iIndex == (value.length-1)}
                      removable     = {value.length>1}
                      />
            </div>
          )
        }
        )}
        <FFSTotal value = {value}
                  decimalSign={decimalSign}/>  
      </div>
    </FInputAddon>
  )
}

const FInputFloatSum = withWrapControlledForArray(_FInputFloatSum)


FInputFloatSum.propTypes = {
  ...inputPropTypes,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.arrayOf(PropTypes.number),
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  decimals            : PropTypes.number,
  decimalSign         : PropTypes.oneOf([',', '.']),
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}


FInputFloatSum.defaultProps = {
  ...inputDefaultProps,
  icon: "sigma",
  decimals: undefined,
  decimalSign: '.'
}



export default FInputFloatSum