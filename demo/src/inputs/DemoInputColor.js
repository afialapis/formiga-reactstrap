import React, {useState} from 'react'
import {FInputColor} from '../../../src'

const DemoInputColor = (options) => {
  const [color, setColor]= useState('#FF00FF')
  
  return (
      <FInputColor
              name             = {'color'}
              value            = {color}
              onChange         = {(v, c) => {/*console.log(`color changes to ${v} ${c}`);*/ setColor(v)}}
              disallowedValues = {['#000000', '#FFFFFF', '#ffffff']}
              feedback         = {'Neither black nor white'}
              label            = {"What color has your world now?"}
              description      = "Neither black nor white!"
              {...options}
              />     
  )
}

export {DemoInputColor}
