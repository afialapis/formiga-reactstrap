import React       from 'react'
import FInputNumberBase from './FInputNumberBase.mjs'
import useFloatProps from './useFloatProps.mjs'
import {FLT_FLOAT_ES, FLT_FLOAT_EN} from '../../helpers/float/floatFilters.mjs'

const FInputFloat = ({decimalSign = '.', icon= 'dollar', ...props}) => {

  const t= useFloatProps(decimalSign)

  return (
    <FInputNumberBase {...
        {...props,
          icon,
         inputFilter: 
           decimalSign==','
          ? FLT_FLOAT_ES
          : FLT_FLOAT_EN,
         t
        }
      }/>
  )
 }

export default FInputFloat
