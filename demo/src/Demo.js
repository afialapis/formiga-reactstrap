import React, {useState, useEffect} from 'react';
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
import {DemoInputFile} from "./inputs/DemoInputFile";
import {Base} from './base/Base'
import {FForm} from '../../src'

import './demo.scss'


const INPUT_TYPES= [
  {type: 'text', comp: DemoInputText},
  {type: 'textarea', comp: DemoInputTextArea},
  {type: 'number', comp: DemoInputNumber},
  {type: 'date', comp: DemoInputDate},
  {type: 'time', comp: DemoInputTime},
  {type: 'checkbox', comp: DemoInputCheckbox},
  {type: 'select', comp: DemoInputSelect},
  {type: 'select-multiple', comp: DemoInputSelectMultiple},
  {type: 'search', comp: DemoInputSelectSearch},
  {type: 'color', comp: DemoInputColor},
  {type: 'file', comp: DemoInputFile}
]

const getResumeFromElements= (elements) => {
  const nResume= []
  elements.map((el) => {
    nResume.push({msg: el.name, style:  {marginTop: '1em', fontWeight: 'bold'}})
    nResume.push({msg: el.value, style: {fontStyle: 'italic'}})
    nResume.push({msg: `is ${el.valid ? 'valid!' : `invalid (${el.feedback})`}`, 
                style: {color: el.valid ? 'green' : 'red'}})
  })
  return nResume
}


const Demo = () => {
  const [options, setOptions]= useState({
    keepHeight  : true,
    icon        : true,
    showValidity: 4,
    bsSize      : 'sm'
  })

  //const [resume, setResume]= useState([{msg: "Save form to see a resume here!"}])
  const [resume, setResume]= useState([])
  const [elements, setElements]= useState([])

  useEffect(() => {
    setResume(getResumeFromElements(elements))
  }, [elements])

//  const handleSubmit = (valid, elements) => {
//    const nResume= []
//    elements.map((el) => {
//      nResume.push({msg: el.name, style:  {marginTop: '1em', fontWeight: 'bold'}})
//      nResume.push({msg: el.value, style: {fontStyle: 'italic'}})
//      nResume.push({msg: `is ${el.valid ? 'valid!' : `invalid (${el.feedback})`}`, 
//                  style: {color: el.valid ? 'green' : 'red'}})
//    })
//
//    setResume(nResume)
//  }

  const handleSubmit = (valid, elements) => {
    setResume(getResumeFromElements(elements))
  }

  const getMenuItems= () => {
    let items= []
    INPUT_TYPES.map((inputType) => {
      let item= {
        key: inputType.type,
        label: inputType.type,
      }

      items.push(item)
    })
    return items
  }

  
  return (  

      <Base logoSrc = "assets/img/formiga-reactstrap.png"
            menuTitle   = "Input Types"
            menuItems   = {getMenuItems()}
            options     = {options}
            onChangeOption = {(name, value) => {
              setOptions({
                ...options,
                [name]: value
              })
            }}
            resume  = {resume}>

        <FForm  onSave     = {handleSubmit} 
                onCancel   = {undefined}
                autoDisable= {false}
                getElements= {(e) => setElements(e)}
                renderButtons={(valid, felements) => 
                    <div className="centered">
                      <a className={`afi-btn afi-btn-primary ${valid ? '' : 'disabled'}`}
                        onClick={(ev) => handleSubmit(valid, felements, ev)}>
                        {valid ? 'Submit' : 'Invalid yet'}
                      </a>
                    </div>
                }
                >
             
            {INPUT_TYPES.map((inputType) => 
                <section key={`section_${inputType.type}`}
                      id={inputType.type}>
                  <h2>{inputType.type}</h2>
                    <inputType.comp keepHeight= {options.keepHeight}
                                    icon= {options.icon===false ? false : undefined}
                                    showValidity= {options.showValidity}
                                    bsSize= {options.bsSize}
                                    />
                </section>
              )
            }
            

          

        </FForm>
      </Base>

  )
}

export {Demo}
