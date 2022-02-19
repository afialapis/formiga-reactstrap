import React       from 'react'
import { useIntProps } from './helpers/useNumberProps'
import VInputNumber from './_VInputNumber'


const VInputUInt = (props) => {
 
  const [inputFilter, t]= useIntProps(true)

  return (

    <VInputNumber {...
        {...props,
          inputFilter,
          t
        }
      }/>
  )
}

VInputUInt.propTypes = VInputNumber.propTypes

VInputUInt.defaultProps = {
  ...VInputNumber.defaultProps,
  icon: 'dice'
}

export default VInputUInt
