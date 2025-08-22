const SHOW_VALIDITY_DEFAULT = 'changes+invalid'

const _translateValue = (v) => {
  if (['never', 'changes+invalid', 'changes', 'always', 'invalid'].indexOf(v)>=0) {
    return v
  }
  if (v===false) return 'never'

  return SHOW_VALIDITY_DEFAULT
}

export const showValidityMerge = (showValidity) => {
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
    //console.log(`shouldShowValidityFor: input not mounted yet`)
    return false
  }

  // never
  if (mode==='never') {
    return false
  }

  if (mode === 'changes+invalid') {
    //console.log(`shouldShowValidityFor: changes+invalid ${input.hasChanged===true} ${input.valid!==true}`)
    return (input.hasChanged===true) && (input.valid!==true)
  }

  if (mode === 'changes') {
    //console.log(`shouldShowValidityFor: changes ${input.hasChanged===true}`)
    return (input.hasChanged===true)
  }

  if (mode === 'invalid') {
    //console.log(`shouldShowValidityFor: invalid ${input.valid!==true}`)
    return (input.valid!==true)
  }

  if (mode === 'always') {
    //console.log(`shouldShowValidityFor: always`)
    return true
  }

 //console.log(`shouldShowValidityFor: unknown mode ${mode}`)
 return false
}



export default (input, showValidity) => {
  const options = showValidityMerge(showValidity)

  return {
    input: shouldShowValidityFor(input, options.input),
    message: shouldShowValidityFor(input, options.message)
  }
}
