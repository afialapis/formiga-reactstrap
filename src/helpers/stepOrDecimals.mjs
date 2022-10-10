
const stepOrDecimals = (step, decimals) => {
  if (step!=undefined) {
    if (! isNaN(step)) {
      return step
    }
  }
  if (decimals!=undefined) {
    if (! isNaN(decimals)) {
      return 1/Math.pow(10,decimals)
    }
  }  
  return undefined
}

export default stepOrDecimals