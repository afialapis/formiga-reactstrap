/**
 * https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792
 */

import React from 'react'
import FIconBase from './FIconBase.mjs'
import library from './library.mjs'

const FIcon =({icon, color}) => {
  if (typeof icon == "string" && icon.length>0 && Object.keys(library).indexOf(icon)>=0)
    return <FIconBase icon={library[icon]} color={color}/>
  return icon
}

export default FIcon