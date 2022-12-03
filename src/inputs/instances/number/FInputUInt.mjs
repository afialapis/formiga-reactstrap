import React       from 'react'
import useIntProps from './useIntProps.mjs'
import FInputNumberBase from './FInputNumberBase.mjs'


const FInputUInt = (props) => {
 
  const t= useIntProps(true)

  return (

    <FInputNumberBase {...
        {...props,
          inputFilter: 'uint',
          t
        }
      }/>
  )
}

FInputUInt.propTypes = FInputNumberBase.propTypes

FInputUInt.defaultProps = {
  ...FInputNumberBase.defaultProps,
  icon: 'dice'
}

export default FInputUInt
