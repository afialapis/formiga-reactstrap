/**
 * https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792
 */

import React from 'react'
import VIconBase from './VIconBase'
import library from './library'

const VIcon =({icon, color}) => {
  if (typeof icon == "string" && icon.length>0 && Object.keys(library).indexOf(icon)>=0)
    return <VIconBase icon={library[icon]} color={color}/>
  return icon
}

export default VIcon