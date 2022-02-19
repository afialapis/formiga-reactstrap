import React, {useState} from 'react'
import {VInputSelectMultiple} from '../../../src'

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
    <VInputSelectMultiple
            name            = {'times'}
            options         = {LISTM_OPTIONS}
            value           = {times}
            onChange        = {(v) => setTimes(v)}
            disallowedValues= {[[1, 3, 5, 7]]}
            label           = {"What times you prefer to take a Formiga?"}
            description     = "All even hours required"
            {...options}
            />      
  )
}

export {DemoInputSelectMultiple}