import React, {useState} from 'react'
import {FInputCheckbox /*, FInputCheckbox2*/} from '../../../src'

const DemoInputCheckbox = (options) => {
  const [effects, setEffects]= useState(true)
  //const [reco, setReco]= useState(true)

  return (
    <>
      <FInputCheckbox
             name             = {'effects'}
             value            = {effects}
             onChange         = {(v) => setEffects(v)}
             disallowedValues = {[true]}
             validationMessage= {"You are probably confusing it with some drug effects"}
             label            = {""}
             checkboxLabel    = "Did you notice side effects?"
             description      = ""
             {...options}
             />
      {/*
      <FInputCheckbox2
             name             = {'reco'}
             value            = {reco}
             onChange         = {(v) => setReco(v)}
             disallowedValues = {[false]}
             validationMessage= {"Please rethink it"}
             label            = {""}
             checkboxLabel    = "Would you recommend us to some friend?"
             description      = ""
             {...options}
             />
      */}     
    </>     
  )
}

export {DemoInputCheckbox}
