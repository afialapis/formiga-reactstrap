const countDecimals = (f) => {
  try {
    const s= parseFloat(f).toString()
    if (s.indexOf('e-')>0) {
      return parseInt(s.split('-')[1])
    }
    return f.toString().split('.')[1].length
  } catch(_) {
    return 0
  }
}

export default countDecimals
