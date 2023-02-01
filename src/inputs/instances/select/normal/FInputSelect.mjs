import React, {useCallback} from 'react'
import PropTypes        from 'prop-types'
import {useInput}       from 'formiga'
import {inputPropTypes}  from '../../../props/inputPropTypes.mjs'
import {inputDefaultProps} from '../../../props/inputDefaultProps.mjs'
import {FInputAddon} from '../../../addon/FInputAddon.mjs'
import {useEnabledOptions}         from '../useEnabledOptions.mjs'
import {parseValueDependOnOptions} from '../parseValueDependOnOptions.mjs'
import withWrapControlled from '../../../helpers/props/withWrapControlled.mjs'
import FISClear from './FISClear.mjs'
import FISInput from './FISInput.mjs'

const _FInputSelect = (props) => {

  const { setValue,
          allowedValues, disallowedValues, options, 
          clearable} = props

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

const FInputSelect = withWrapControlled(_FInputSelect, (v) => v || '')

FInputSelect.propTypes = {
  ...inputPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.array)]),
  autocomplete: PropTypes.oneOf(["on", "off"]),
  clearable   : PropTypes.bool
}

FInputSelect.defaultProps = {
  ...inputDefaultProps,
  icon: 'list',
  clearable: true
}

export default FInputSelect