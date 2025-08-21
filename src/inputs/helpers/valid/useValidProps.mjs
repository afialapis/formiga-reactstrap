import shouldShowValidity from './shouldShowValidity.mjs'

export default (input, showValidity) => {
  const {input: showInput}= shouldShowValidity(input, showValidity)
  
  return (showInput)
    ? {valid: input.valid, invalid: ! input.valid}
    : {}
}
