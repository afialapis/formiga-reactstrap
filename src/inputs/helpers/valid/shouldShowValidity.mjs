const SHOW_VALIDITY_DEFAULT = 'changes+invalid'

const _translateValue = (v) => {
  if (['never', 'changes+invalid', 'changes', 'always', 'invalid'].indexOf(v)>=0) {
    return v
  }
  if (v===false) return 'never'

  return SHOW_VALIDITY_DEFAULT
}

const showValidityMerge = (showValidity) => {
  // false | 'never'                       : never
  // true  | 'default' | 'changes+invalid' : after changes + only invalid
  // 'changes'                             : after changes
  // 'always'                              : on render
  // 'invalid'                             : on render + only invalid

  return (typeof showValidity==="object")
    ? {
      input: _translateValue(showValidity?.input),
      message: _translateValue(showValidity?.message),
      }
    : {
      input: _translateValue(showValidity),
      message: _translateValue(showValidity),
      }
}


const shouldShowValidityFor = (input, mode) => {
  // input not mounted yet
  if (input.node===undefined) {
    return false
  }

  // never
  if (mode==='never') {
    return false
  }

  if (mode === 'changes+invalid') {
    return (input.hasChanged===true) && (input.valid!==true)
  }

  if (mode === 'changes') {
    return (input.hasChanged===true)
  }

  if (mode === 'invalid') {
    return (input.valid!==true)
  }

  if (mode === 'always') {
    return true
  }

 return false
}



export default (input, showValidity) => {
  const options = showValidityMerge(showValidity)

  return {
    input: shouldShowValidityFor(input, options.input),
    message: shouldShowValidityFor(input, options.message)
  }
}
