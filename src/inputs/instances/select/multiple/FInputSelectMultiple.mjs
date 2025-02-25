import React, {useCallback} from 'react'
import {useInput} from 'formiga'
import {FInputAddon}       from '../../../addon/FInputAddon.mjs'
import {useEnabledOptions}         from '../useEnabledOptions.mjs'
import {parseValueDependOnOptions} from '../parseValueDependOnOptions.mjs'
import FISMInput from './FISMInput.mjs'
import withWrapControlled from '../../../helpers/props/withWrapControlled.mjs'
import useSize from './useSize.mjs'
import FISMClear from './FISMClear'

const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}

const _def_size = (v, opts) => Array.isArray(opts) ? opts.length : 0


const FInputSelectMultipleBase = (props) => {
  const {allowedValues, disallowedValues, options, size= _def_size, clearable= true,
         value, setValue, icon= 'list'} = props

  const enabledOptions= useEnabledOptions(options, allowedValues, disallowedValues)

  const input= useInput({
    ...props,
   checkValue: props.checkValue!=undefined 
   ? (value) => props.checkValue(
                value.map((v) => parseValueDependOnOptions(v, enabledOptions))
    )
   : undefined     
  })

  const theSize = useSize(size, value, options)
  

  const handleChange= useCallback((ev) => {
    const value= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => parseValueDependOnOptions(opt.value, enabledOptions))

    setValue(numOrArrayToString(value), true, ev)

    input.validate()
  }, [setValue, enabledOptions, input])

  const handleClear = useCallback((event) => {
    setValue([], true, event)

  }, [setValue])


  return (
    <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}
                 icon = {icon}>
      <FISMInput {...props}
                valid= {input.valid}
                inputRef= {input.ref}
                onInputChange= {handleChange}
                enabledOptions= {enabledOptions}
                theSize = {theSize}/>
      {clearable!==false
        ? <FISMClear {...props}
                    onClear= {handleClear}/>
        : null
      }                
    </FInputAddon>
  )
}

const FInputSelectMultiple = withWrapControlled(FInputSelectMultipleBase)

export default FInputSelectMultiple