import React, {useState} from 'react'
import {FInputSelectSearch} from '../../../src'

const LIST_OPTIONS= [
  [1, "Fascination"],
  [2, "Slowliness"],
  [3, "Happyness"],
  [4, "Life"],
  [5, "Dream"],
  [6, "Nightmare"],
]

const DemoInputSelectSearch = (options) => {
  const [aword, setAWord]= useState(6)
  const [optionList, setOptionList]= useState(LIST_OPTIONS)

  const handleAddOption = (t) => {
    setOptionList([
      ...optionList,
      [10, t]
    ])
  }


  return (
    <FInputSelectSearch
            name            = {'aword'}
            options         = {optionList}
            value           = {aword}
            onChange        = {(v) => setAWord(v)}
            required        = {true}
            //disallowedValues= {[2, 6]}
            label           = {"A word that comes to your mind"}
            validationMessage = {'You are probably confused'}
            description     = ""
            clearable       = {true}
            creatable       = {true}
            onCreate        = {(text, ev) => {handleAddOption(text); setAWord(10)}}
            {...options} 
            showValidity    = {'changes+invalid'}
            />

  )
}

export {DemoInputSelectSearch}
