import React, {useCallback} from 'react'
import {useInput}       from 'formiga'
import {FInputAddon} from '../../../addon/FInputAddon.mjs'
import {useEnabledOptions}         from '../useEnabledOptions.mjs'
import {parseValueDependOnOptions} from '../parseValueDependOnOptions.mjs'
import withWrapControlled from '../../../helpers/props/withWrapControlled.mjs'
import FISClear from './FISClear.mjs'
import FISInput from './FISInput.mjs'

const FInputSelectBase = (props) => {

  const { setValue,
          allowedValues, disallowedValues, options, 
          clearable= true, icon= 'list'} = props

  const enabledOptions= useEnabledOptions(options, allowedValues, disallowedValues)

  const input= useInput({
    ...props,
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(parseValueDependOnOptions(v, enabledOptions))
                : undefined    
  })

  const updValue = useCallback((nValue, confirm, event) => {
    const iValue= parseValueDependOnOptions(nValue, enabledOptions)
    setValue(iValue, confirm, event)
    input.setValue(iValue)
    input.validate()

  }, [input, enabledOptions, setValue])

  const handleChange = useCallback((event) => {
    updValue(event.target.value, true, event)
  }, [updValue])


  const handleClear = useCallback((event) => {
    updValue('', true, event)

  }, [updValue])



  return (
    <FInputAddon {...props}
                 icon = {icon}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {input.feedback}>
      <FISInput {...props}
                valid= {input.valid}
                inputRef= {input.ref}
                onInputChange= {handleChange}
                enabledOptions= {enabledOptions}/>
      {clearable!==false
        ? <FISClear {...props}
                    onClear= {handleClear}/>
        : null
      }
    </FInputAddon>
  )
}

const FInputSelect = withWrapControlled(FInputSelectBase, (v) => v || '')

export default FInputSelect