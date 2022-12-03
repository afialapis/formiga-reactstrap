import React       from 'react'
import PropTypes   from 'prop-types'
import FInputNumberBase from './FInputNumberBase.mjs'
import useFloatProps from './useFloatProps.mjs'
import {FLT_FLOAT_ES, FLT_FLOAT_EN} from '../../helpers/float/floatFilters.mjs'

const FInputFloat = (props) => {

  const t= useFloatProps(props.decimalSign)

  return (
    <FInputNumberBase {...
        {...props,
         inputFilter: 
           props.decimalSign==','
          ? FLT_FLOAT_ES
          : FLT_FLOAT_EN,
         t
        }
      }/>
  )
 }

FInputFloat.propTypes = {
  ...FInputNumberBase.propTypes,
  decimals    : PropTypes.number,
  decimalSign : PropTypes.oneOf([',', '.']),
}

FInputFloat.defaultProps = {
  ...FInputNumberBase.defaultProps,
  icon: 'dollar',
  decimals: undefined,
  decimalSign: '.'
}

export default FInputFloat
