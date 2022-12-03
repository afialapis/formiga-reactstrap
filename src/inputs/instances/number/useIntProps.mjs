import isNotNumber from '../../helpers/float/isNotNumber'

const _checkInt = (s) => {
  let n= (s==undefined) 
         ? '' 
         : s.toString().replace(/,/g, '.')
  if (isNotNumber(n)) {
    return false
  }
  return true
}


const useIntProps = () => {
  const toInt = (s) => {
    if (! _checkInt(s)) {
      //console.log(`toInt ${typeof s} [${s}] => 0 (not int)`)
      return 0
    }
    return parseInt(s.toString().replace(/,/g, '.'))
  }
  
  const fromInt = (f) => {
    if (isNotNumber(f)) {
      //console.log(`fromInt ${typeof f} [${f}] => "" (not number)`)
      return ''
    } 
    const s= parseInt(f).toString() 
    return s
  }
      
  const t= {
    from: fromInt, 
    to: toInt
  }

  return t
}


export default useIntProps

