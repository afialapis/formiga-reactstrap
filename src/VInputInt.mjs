import React       from 'react'
import { useIntProps } from './helpers/useNumberProps.mjs'
import VInputNumber from './_VInputNumber.mjs'


const VInputInt = (props) => {
 
  const [inputFilter, t]= useIntProps(false)

  return (

    <VInputNumber {...
        {...props,
          inputFilter,
          t
        }
      }/>
  )
}

VInputInt.propTypes = VInputNumber.propTypes

VInputInt.defaultProps = {
  ...VInputNumber.defaultProps,
  icon: 'dice'
}

export default VInputInt
