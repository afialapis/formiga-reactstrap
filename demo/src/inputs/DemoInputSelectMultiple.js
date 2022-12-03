import React, {useState} from 'react'
import {FInputSelectMultiple} from '../../../src'

const LISTM_OPTIONS= [
  [1, "08:00"],
  [2, "09:00"],
  [3, "10:00"],
  [4, "11:00"],
  [5, "12:00"],
  [6, "13:00"],
  [7, "14:00"],
  [8, "15:00"],
]

const DemoInputSelectMultiple = (options) => {
  const [times, setTimes]= useState(['3', '5', '7'])

  return (
    <FInputSelectMultiple
            name            = {'times'}
            options         = {LISTM_OPTIONS}
            value           = {times}
            onChange        = {(v) => setTimes(v)}
            disallowedValues= {[[1], [3], [5], [7], [1, 3, 5, 7]]}
            size            = {5}
            label           = {"What times you prefer to take a Formiga?"}
            description     = "Some even hours not allowed"
            {...options}
            />      
  )
}

export {DemoInputSelectMultiple}