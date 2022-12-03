import React, {useState} from 'react'
import {FInputSelect} from '../../../src'

const LIST_OPTIONS= [
  //['' , '---'],
  [1, "It's fascinating"],
  [2, "It's cool"],
  [3, "Well... beh!"],
  [4, "Take it away from me"],
]

const DemoInputSelect = (options) => {
  const [experience, setExperience]= useState(2 /*'1'*/)

  return (
    <FInputSelect
            name            = {'experience'}
            options         = {LIST_OPTIONS}
            value           = {experience}
            onChange        = {(v) => setExperience(v)}
            required        = {true}
            disallowedValues= {[3, 4]}
            allowedValues   = {['', 1, 2]}
            label           = {"What do you think about Formiga?"}
            description     = ""
            clearable       = {true}
            {...options}
            />

  )
}

export {DemoInputSelect}
