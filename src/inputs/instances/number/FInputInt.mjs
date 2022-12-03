import React       from 'react'
import useIntProps from './useIntProps.mjs'
import FInputNumberBase from './FInputNumberBase.mjs'


const FInputInt = (props) => {
 
  const t= useIntProps(false)

  return (

    <FInputNumberBase {...
        {...props,
          inputFilter: 'int',
          t
        }
      }/>
  )
}

FInputInt.propTypes = FInputNumberBase.propTypes

FInputInt.defaultProps = {
  ...FInputNumberBase.defaultProps,
  icon: 'dice'
}

export default FInputInt
