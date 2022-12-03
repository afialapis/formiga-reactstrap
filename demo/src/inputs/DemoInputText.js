import React, {useState} from 'react'
import {FInputText} from '../../../src'

const DemoInputText = (options) => {
  const [name, setName]= useState('John Not Doe')
  const [age, _setAge]= useState('33') 
  const [words, setWords]= useState('another dimension man!')

  return (
    <>
      <FInputText
              name                = 'name'
              value               = {name}
              onChange            = {(v) => setName(v)}
              required            = {true}
              disallowedValues    = {["John Doe"]}
              inputFilter         = "latin"
              label               = {"Your name here"}
              description         = {"Controlled. Required. 'John Doe' is disallowed. Latin chars."}
              {...options}                
      />

      <FInputText
              name        = 'age'
              defaultValue= {age}
              required    = {true}
              checkValue  = {(v) => !isNaN(v) && parseInt(v)>=18}
              inputFilter = "int"
              label       = {"Your age here"}
              description = {"Uncontrolled. Required. Some >18 integer (through inputFilter)"}
              {...options}                 
      />

      <FInputText
              name         = 'words'
              value        = {words}
              onChange     = {(v) => setWords(v)}
              maxLength    = {20}
              label        = {"Your experience with Formiga in two words"}
              description  = {`Controlled. Not required. Max length 20 (currently ${words.length})`}
              {...options}               
      />
    </>
  )
}

export {DemoInputText}
