import React, {useState, useEffect} from 'react'
import {useInput} from 'formiga'
import {FInputAddon} from '../../addon/FInputAddon.mjs'
import {DatePicker} from 'reactstrap-date-picker'
import isControlled from '../../helpers/props/isControlled.mjs'
import { getDefaultLocale, DATES_LOCALES } from './locale.mjs'
import FIcon from '../../../commons/icons/FIcon.mjs'

const _DEF_INPUT_STYLE = {}
const _DEF_LOCALE = getDefaultLocale()

const _formatInnerValue = (isoString, separator= '/', dateFormat= "DD/MM/YYYY") => {
  const date= isoString ? new Date(isoString) : null
  if (! date) {
    return ''
  }

  const month = date.getMonth() + 1
  const day = date.getDate()

  if (dateFormat.match(/MM.DD.YYYY/)) {
    return (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`) + separator + date.getFullYear()
  }
  else if (dateFormat.match(/DD.MM.YYYY/)) {
    return (day > 9 ? day : `0${day}`) + separator + (month > 9 ? month : `0${month}`) + separator + date.getFullYear()
  }
  else {
    return date.getFullYear() + separator + (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`)
  }
}
  
const FInputDateBase = (props) => {
  const {id, name, placeholder, readOnly, autocomplete, 
         inputGroupStyle, 
         required, inputStyle= _DEF_INPUT_STYLE, onChange, transform,
         showValidity= 4, bsSize,
         locale= _DEF_LOCALE, rdp, icon= 'calendar'} = props

  const controlled= isControlled(props)
  const {value, defaultValue}= props
  const [innerValue, setInnerValue]= useState(controlled ? transform.toISO(value) : transform.toISO(defaultValue))

  const input= useInput({
    ...props,
    transformValue: transform.fromISO,
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(transform.fromISO(v))
                : undefined
  })

  useEffect(() => {
    const nInnerValue= controlled ? transform.toISO(value) : transform.toISO(defaultValue)
    //if (innerValue != nInnerValue) {
      setInnerValue(nInnerValue)
    //}
    input.setValue(_formatInnerValue(nInnerValue))
    input.validate()

  }, [/*innerValue,*/ value, defaultValue, controlled, transform, input])
       
  
  const handleChange = (value, formattedValue) => {
    setInnerValue(value)
    input.setValue(formattedValue || '')
    input.validate()
    if (onChange!=undefined) {
      // TODO Ask RDP to expose event as a onChange() parameter,
      // so we can expose it here too
      onChange(transform.fromISO(value), true, undefined)
    }
  }

  const nInputGroupStyle ={
    ...inputGroupStyle,
    flexWrap: "unset"
  }
  
  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: input.valid, invalid: ! input.valid}
  : {}
  
  const rdpProps = {
    ...DATES_LOCALES[locale] || {},
    ...rdp
  }
  
  return (
    <FInputAddon {...props}
                 icon    = {icon}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}
                 inputGroupStyle= {nInputGroupStyle}>
  
      <DatePicker 
                  id          = {id}
                  name        = {name}
                  weekStartsOn= {1} 
                  placeholder = {placeholder}
                  inputRef    = {input.ref}
                  disabled    = {readOnly}
                  required    = {required}
                  autocomplete= {autocomplete}
                  className   = {(showValidity==1 || showValidity==4) ? input.valid ? 'is-valid' : 'is-invalid' : ''}
                  style       = {inputStyle} 
                  value       = {innerValue}
                  onChange    = {(v,f) => handleChange(v || undefined, f)}
                  size        = {bsSize}
                  clearButtonElement={<FIcon icon="cross"/>}
                  {...showValidProps}
                  {...rdpProps}
      />
    </FInputAddon>
  )
}


export default FInputDateBase