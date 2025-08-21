import React, {useCallback, useEffect, useRef, useState}  from 'react'
import {Modal} from 'reactstrap'
import useInputWrap from '../../helpers/useInputWrap.mjs'
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


const FInputFloatSumModalBase = (props) => {
  const {id, name, value, setValue,
    placeholder, readOnly, 
    step, decimals= undefined, decimalSign= '.',
    autocomplete, inputStyle, showValidity, bsSize, icon= 'sigma', totalStyle, closePosition= true} = props

  const totalRef= useRef(null)
  const [coords, setCoords] = useState(undefined);
  
  const stepOrDecimals = useStepOrDecimals(step, decimals)
  const input = useInputWrap(props, {
    // TODO
    // wrap this checks (as we save array in the hidden input):
    //      min, max, stepOrDecimals,
    //checkValue: (v) => true

    // transformValue,
    // allowedValues, 
    // disallowedValues, 
    // doRepeat, 
    // doNotRepeat, 
    // validationMessage
    decimals: undefined, 
    inputFilter: undefined
  })
  
  const [inputSigns, setInputsSigns]= useState(_getInputSigns(value))
  const [inputWithFocus, setInputWithFocus]= useState(0)
  const [open, setOpen] = useState(false)
  

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

  useEffect(() => {
    input.setValue(value)
    input.validate()
  }, [input, value])

  useEffect(() => {
    const updateCoords = () => {
      if (totalRef.current) {
        const rect = totalRef.current.getBoundingClientRect()
        setCoords({
          top: rect.top - 50,
          left: rect.left + rect.width + 50
        })
      }
    }

    updateCoords()

    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords)

    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
    }
  }, [])
  
  return (
    <FInputAddon {...props}
                  icon    = {icon}
                  input   = {input}>

      <div className  = "formiga-reactstrap-float-sum formiga-reactstrap-float-sum-modal">
        <FFSHidden {...props}
                   inputRef       = {input.ref}
                   defaultValue   = {value}/>
        <Modal isOpen={open}
               toggle={() => setOpen(current => !current)}
               className={`formiga-reactstrap-float-sum-modal-modal`}
               container={/*modalContainer || totalRef.current || */ 'body'}
               style={closePosition ? {
                top: coords?.top,
                left: coords?.left,
                marginRight: 'unset',
                marginLeft: 'unset'
               } : undefined}>
          {value.map((iValue, iIndex) => {
            const sign= inputSigns[iIndex]
            const isLastOne = iIndex == (value.length-1)

            return (
              <div className={`formiga-reactstrap-float-sum-box ${ sign ? 'positive' : 'negative'}`}
                  key      = {`formiga-reactstrap-float-sum-${id || name}-repr-${iIndex}`}>
      
                <FFSInput 
                        className     = "formiga-reactstrap-float-sum-input"
                        placeholder   = {placeholder || ""}
                        readOnly      = {readOnly!=undefined ? readOnly  : false}
                        input         = {input}
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
                        onGoNext      = {() => isLastOne ? setOpen(false) : setInputWithFocus(iIndex+1)}
                        isLastOne     = {isLastOne}
                        removable     = {value.length>1}
                        />
              </div>
            )
          }
          )}
        </Modal>
      
        <FFSTotal value = {value}
                  decimalSign={decimalSign}
                  style={totalStyle}
                  onClick={() => setOpen(current => !current)}
                  totalRef={totalRef}/>
      </div>
    </FInputAddon>
  )
}

const FInputFloatSumModal = withWrapControlledForArray(FInputFloatSumModalBase)





export default FInputFloatSumModal