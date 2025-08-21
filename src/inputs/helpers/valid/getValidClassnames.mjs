import shouldShowValidity from './shouldShowValidity.mjs'


export default (input, showValidity, checkForMessage= false) => {
  const {input: showInput, message: showMessage}= shouldShowValidity(input, showValidity)

  if ( (checkForMessage && showMessage) || (!checkForMessage && showInput) ) {
    return input.valid ? 'is-valid' : 'is-invalid'
  }

  return ''
}
