import React from 'react'
import {DemoInputText} from './inputs/DemoInputText'
import {DemoInputTextArea} from './inputs/DemoInputTextArea'
import {DemoInputNumber} from './inputs/DemoInputNumber'
import {DemoInputDate} from './inputs/DemoInputDate'
import {DemoInputTime} from './inputs/DemoInputTime'
import {DemoInputCheckbox} from './inputs/DemoInputCheckbox'
import {DemoInputSelect} from './inputs/DemoInputSelect'
import {DemoInputSelectMultiple} from './inputs/DemoInputSelectMultiple'
import {DemoInputSelectSearch} from './inputs/DemoInputSelectSearch'
import {DemoInputColor} from './inputs/DemoInputColor'
import {DemoInputFile} from "./inputs/DemoInputFile"

const DemoInputs = ({options}) => {
  return ( 
    <>
      <section
        id={`text`}>
        <h2>text</h2>
        <DemoInputText {...options}/>
      </section>    
      <section
        id={`textarea`}>
        <h2>textarea</h2>
        <DemoInputTextArea {...options}/>
      </section>   
      <section
        id={`number`}>
        <h2>number</h2>
        <DemoInputNumber {...options}/>
      </section>   
      <section
        id={`date`}>
        <h2>date</h2>
        <DemoInputDate {...options}/>
      </section>   
      <section
        id={`time`}>
        <h2>time</h2>
        <DemoInputTime {...options}/>
      </section>   
      <section
        id={`checkbox`}>
        <h2>checkbox</h2>
        <DemoInputCheckbox {...options}/>
      </section>
      <section
        id={`select`}>
        <h2>select</h2>
        <DemoInputSelect {...options}/>
      </section>
      <section
        id={`select-multiple`}>
        <h2>select multiple</h2>
        <DemoInputSelectMultiple {...options}/>
      </section>   
      <section
        id={`search`}>
        <h2>search</h2>
        <DemoInputSelectSearch {...options}/>
      </section>   
      <section
        id={`color`}>
        <h2>color</h2>
        <DemoInputColor {...options}/>
      </section>
      <section
        id={`file`}>
        <h2>file</h2>
        <DemoInputFile {...options}/>
      </section>
    </>
  )
}

export default DemoInputs


