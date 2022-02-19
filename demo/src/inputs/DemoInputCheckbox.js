import React, {useState} from 'react'
import {VInputCheckbox2} from '../../../src'

const DemoInputCheckbox = (options) => {
  const [effects, setEffects]= useState(true)

  return (
      <VInputCheckbox2
             name             = {'effects'}
             value            = {effects}
             onChange         = {(v) => setEffects(v)}
             disallowedValues = {[true]}
             label            = {""}
             checkboxLabel    = "Did you notice side effects?"
             description      = ""
             {...options}
             />
  )
}

export {DemoInputCheckbox}
