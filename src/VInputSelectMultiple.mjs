import React, {useCallback} from 'react'
import PropTypes    from 'prop-types'
import {useInput} from 'formiga'
import {Input} from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes.mjs'
import {inputDefaultProps} from './props/inputDefaultProps.mjs'
import {VInputAddon} from './addon/VInputAddon.mjs'
import {useInnerValue} from './value/useInnerValue.mjs'
import {getEnabledOptions} from './helpers/getEnabledOptions.mjs'
import {parseValueDependOnOptions} from './helpers/parseValueDependOnOptions.mjs'

const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}


const VInputSelectMultiple = (props) => {
  const {id, name,  label, description, feedback, 
         placeholder, readOnly, autocomplete, required,
         allowedValues, disallowedValues, onChange, options, 
         inputStyle, icon,
         showValidity, inline, keepHeight, inputGroupStyle, formGroupStyle, bsSize} = props


  const [_initialValue, innerValue, setInnerValue] = useInnerValue(props)
  const enabledOptions= getEnabledOptions(options, allowedValues, disallowedValues)

  const [inputRef, valid, message, setValidity]= useInput({
    ...props,
   checkValue: props.checkValue!=undefined 
   ? (value) => props.checkValue(
                value.map((v) => parseValueDependOnOptions(v, enabledOptions))
    )
   : undefined     
  })
  

  const handleChange= useCallback((ev) => {
    const value= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => parseValueDependOnOptions(opt.value, enabledOptions))

    setInnerValue(numOrArrayToString(value))
    if (onChange!=undefined) { 
      onChange(value, true, ev)
    }
    setValidity()
  }, [setInnerValue, onChange, setValidity, enabledOptions])

  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: valid, invalid: ! valid}
  : {}


  return (
    <VInputAddon name           = {name}
                 label          = {label}
                 description    = {description}
                 feedback       = {feedback||message}
                 value          = {innerValue}
                 icon           = {icon}
                 showValidity   = {showValidity}                 
                 isValid        = {valid}
                 inline         = {inline}
                 keepHeight     = {keepHeight}
                 inputGroupStyle= {inputGroupStyle}
                 formGroupStyle = {formGroupStyle}
                 >

      <Input    id          = {id}
                name        = {name}
                type        = "select"
                className   = {`custom-select ${bsSize!=undefined ? 'custom-select-'+bsSize : ''}`}
                multiple
                innerRef    = {inputRef}
                placeholder = {placeholder || ""}
                readOnly    = {readOnly!=undefined ? readOnly  : false}
                required    = {required}
                autoComplete= {autocomplete}
                style       = {inputStyle} 
                bsSize      = {bsSize}
                value       = {innerValue || ''}
                onChange    = {(event) => handleChange(event)}
                {...showValidProps}
                >
        {enabledOptions.map((opt) => 
          <option key={`${name}_option_${opt.value}`}
                  value={opt.value}
                  disabled={opt.disabled}
                  >
            {opt.label}
          </option>
        )}
      </Input>
    </VInputAddon>
  )
}


VInputSelectMultiple.propTypes = {
  ...inputPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.array)]),
  autocomplete: PropTypes.oneOf(["on", "off"])
}

VInputSelectMultiple.defaultProps = {
  ...inputDefaultProps,
  icon: 'list'
}


export default VInputSelectMultiple