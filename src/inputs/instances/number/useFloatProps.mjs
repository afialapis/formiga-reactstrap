import isNotNumber from '../../helpers/float/isNotNumber'

const _checkFloat = (s) => {
  let n= (s==undefined) 
         ? '' 
         : s.toString().replace(/,/g, '.')
  if (isNotNumber(n)) {
    return false
  }
  return true
}

const useFloatProps = (decimalSign) => {
  const toFloat = (s) => {
    if (! _checkFloat(s)) {
      //console.log(`toFloat ${typeof s} ${s} => 0.0 (not float)`)

      return 0.0
    }
    return parseFloat(s.toString().replace(/,/g, '.'))
  }

  const fromFloat = (f) => {
    if (isNotNumber(f)) {
      //console.log(`fromFloat ${typeof f} ${f} => "" (not number)`)
      return ''
    } 

    const s= 
      parseFloat(f)
      .toString() 
      .replace('.', decimalSign)

      //console.log(`fromFloat ${f} => ${s}`)

    return s
  }

  const t= {
    from: fromFloat, 
    to: toFloat
  }

  return t
}


export default useFloatProps
