import {useInput} from 'formiga'

const trimFormigaProps = (props) => {
  return {
    originalValue: props?.defaultValue || props?.value,
    transformValue: props?.transformValue,
    checkValue: props?.checkValue,
    allowedValues: props?.allowedValues,
    disallowedValues: props?.disallowedValues,
    doRepeat: props?.doRepeat,
    doNotRepeat: props?.doNotRepeat,
    decimals: props?.decimals,
    validationMessage: props?.validationMessage,
    inputFilter: props?.inputFilter,  
  }
}

export default (props, extraProps) => {
  return useInput({
    ...trimFormigaProps(props),
    ...extraProps || {}  
  })  
}