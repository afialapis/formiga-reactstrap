import React, {useState, useEffect} from 'react'
import {sumFloatList} from './floatConv.mjs'
import countDecimals from '../../helpers/float/countDecimals.mjs'

const getInnerSum = (summed, value) => {
  if (summed==undefined || value==undefined || value.length==0) {
    return 0
  }
  // Round sum to the max number of decimals
  const decs= value.map((f) => countDecimals(f)) 
  const maxd= Math.max(...decs)
  return summed.toFixed(maxd)
}


const getInnerSumRepr = (innerSum, decimalSign) => {
  return innerSum.toString().replace('.', decimalSign)
 }


const FFSTotal = ({value, decimalSign, style}) => {
  const [innerSum, setInnerSum]    = useState(getInnerSum(sumFloatList(value), value)) 
  const [innerSumRepr, setInnerSumRepr]= useState(getInnerSumRepr(innerSum, decimalSign))

  useEffect(() => {
    const nInnerSum= getInnerSum(sumFloatList(value), value)
    setInnerSum(nInnerSum)

    setInnerSumRepr(getInnerSumRepr(nInnerSum, decimalSign))
  }, [value, decimalSign])
   
  return (
    <div className="formiga-reactstrap-float-sum-total"
          style={style}>
      {isNaN(innerSum) ? '' : innerSumRepr}
    </div>      
  )
}

export default FFSTotal
