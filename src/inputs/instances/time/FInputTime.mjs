import React, {useCallback}      from 'react'
import PropTypes  from 'prop-types'
import {useInput} from 'formiga'
import {Input}    from 'reactstrap'
import {inputPropTypes}    from '../../props/inputPropTypes.mjs'
import {inputDefaultProps} from '../../props/inputDefaultProps.mjs'
import {FInputAddon}       from '../../addon/FInputAddon.mjs'
import FITClear from './FITClear.mjs'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'

const _FInputTime = (props) => {
  const {id, name, 
    placeholder, readOnly, 
    required, step, min, max,
    autocomplete, inputStyle, showValidity, bsSize, 
    value, setValue} = props      

  const input = useInput({...props})

  const handleChange = useCallback((event) => {
    const newValue= event.target.value
    setValue(newValue, true, event)
  }, [setValue])

  const handleClear = useCallback((event) => {
    setValue(undefined, true, event)
  }, [setValue])



  const showValidProps = (showValidity==1 || showValidity==4)
    ? {valid: input.valid, invalid: ! input.valid}
    : {}

  return (
    <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>
            
        <Input  id          = {id}
                name        = {name}
                innerRef    = {input.ref}
                type        = {"time"}
                placeholder = {placeholder || ""}
                readOnly    = {readOnly!=undefined ? readOnly  : false}
                required    = {required}
                autoComplete= {autocomplete}
                style       = {inputStyle} 
                bsSize      = {bsSize}
                value       = {value}
                onChange    = {handleChange}
                step        = {step}
                min         = {min}
                max         = {max}
                {...showValidProps}
      />

      <FITClear {...props}
                onClear = {handleClear}/>
    </FInputAddon>
  )
}

const FInputTime = withWrapControlled(_FInputTime, (v) => v || '')

FInputTime.propTypes = {
  ...inputPropTypes,
  placeholder  : PropTypes.string,
  autocomplete : PropTypes.oneOf(["on", "off"]),
  max          : PropTypes.string,
  min          : PropTypes.string,
  step         : PropTypes.number,
  clearable    : PropTypes.bool
}

FInputTime.defaultProps = {
  ...inputDefaultProps,
  icon: 'time',
  step: 60
}


export default FInputTime