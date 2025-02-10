import React       from 'react'
import useIntProps from './useIntProps.mjs'
import FInputNumberBase from './FInputNumberBase.mjs'


const FInputUInt = ({icon= 'dice', ...props}) => {
 
  const t= useIntProps(true)

  return (

    <FInputNumberBase {...
        {...props,
          icon,
          inputFilter: 'uint',
          t
        }
      }/>
  )
}

export default FInputUInt
