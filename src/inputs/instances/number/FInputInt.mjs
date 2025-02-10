import React       from 'react'
import useIntProps from './useIntProps.mjs'
import FInputNumberBase from './FInputNumberBase.mjs'


const FInputInt = ({icon= 'dice', ...props}) => {
 
  const t= useIntProps(false)

  return (

    <FInputNumberBase {...
        {...props,
          icon,
          inputFilter: 'int',
          t
        }
      }/>
  )
}

export default FInputInt
