const parseValueDependOnOptions = (v, options) => {
  let iValue= v

  // check if is Numeric and convert
  if (! isNaN(iValue)) {
    const optVals= options.map((o) => o.value)
    if (optVals.indexOf(iValue)<0) {

      if (optVals.indexOf(parseFloat(iValue))>=0) {
        iValue= parseFloat(iValue)
      } else if (optVals.indexOf(parseInt(iValue))>=0) {
        iValue= parseInt(iValue)
      } 
    }
  }  

  return iValue
}


export {parseValueDependOnOptions}