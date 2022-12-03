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

const _checkFloatList = (l) => {
  if (l==undefined || l=='' || l.length==0) {
    return false
  }

  let valid= true
  for (const s of l) {
    if (! _checkFloat(s)) {
      valid= false
      break
    }
  }
  return valid
}

const toFloat = (s) => {
  if (! _checkFloat(s)) {
    //console.log(`toFloat ${typeof s} ${s} => 0.0 (not float)`)

    return 0.0
  }
  return parseFloat(s.toString().replace(/,/g, '.'))
}

const toFloatList = (l) => {
  if (! _checkFloatList(l)) {
    return [0.0]
  }
  return l.map(s => toFloat(s))
}


const fromFloat = (f, decimalSign, forceSign) => {
  if (isNotNumber(f)) {
    //console.log(`fromFloat ${typeof f} ${f} => "" (not number)`)
    return ''
  } 

  const n= parseFloat(f)

  let s= 
    n
    .toString() 
    .replace('.', decimalSign)
  
  if ((forceSign===false) && (n==0)) {
    s= `-${s}`
  }

    //console.log(`fromFloat ${f} => ${s}`)

  return s
}


const fromFloatList = (l, decimalSign) => {
  if (l==undefined || l.length==0) {
    return [0.0]
  }
  return l.map((f) => fromFloat(f, decimalSign))
}

const sumFloatList = (l) => {
  const fls= toFloatList(l)
  //console.log(fls)
  const sum= fls.reduce((a,b) => a+b, 0) 
  return sum
}



export {
  fromFloat,
  fromFloatList,
  toFloat,
  toFloatList,
  sumFloatList
}



