import React, {useState} from 'react';
import {DemoInputText} from './inputs/DemoInputText'
import {DemoInputTextArea} from './inputs/DemoInputTextArea'
import {DemoInputNumber} from './inputs/DemoInputNumber'
import {DemoInputDate} from './inputs/DemoInputDate'
import {DemoInputCheckbox} from './inputs/DemoInputCheckbox'
import {DemoInputSelect} from './inputs/DemoInputSelect'
import {DemoInputSelectMultiple} from './inputs/DemoInputSelectMultiple'
import {DemoInputSelectSearch} from './inputs/DemoInputSelectSearch'
import {DemoInputColor} from './inputs/DemoInputColor'
import {DemoInputFile} from "./inputs/DemoInputFile";
import {Base} from './base/Base'
import {VForm} from '../../src'

import './demo.scss'


const INPUT_TYPES= [
  {type: 'text', comp: DemoInputText},
  {type: 'textarea', comp: DemoInputTextArea},
  {type: 'number', comp: DemoInputNumber},
  {type: 'date', comp: DemoInputDate},
  {type: 'checkbox', comp: DemoInputCheckbox},
  {type: 'select', comp: DemoInputSelect},
  {type: 'select-multiple', comp: DemoInputSelectMultiple},
  {type: 'search', comp: DemoInputSelectSearch},
  {type: 'color', comp: DemoInputColor},
  {type: 'file', comp: DemoInputFile}
]


const Demo = () => {
  const [options, setOptions]= useState({
    keepHeight  : true,
    icon        : true,
    showValidity: 4,
    bsSize      : 'sm'
  })

  const [resume, setResume]= useState([{msg: "Save form to see a resume here!"}])


  const handleSubmit = (valid, felements) => {
    const nResume= []
    const elements= felements()
    Object.keys(elements)
      .map((name) => {
        const el= elements[name]
        nResume.push({msg: name, style:  {marginTop: '1em', fontWeight: 'bold'}})
        nResume.push({msg: el.value, style: {fontStyle: 'italic'}})
        nResume.push({msg: `is ${el.valid ? 'valid!' : `invalid (${el.message})`}`, 
                   style: {color: el.valid ? 'green' : 'red'}})
      })

    setResume(nResume)
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

        <VForm  onSave     = {handleSubmit} 
                onCancel   = {undefined}
                autoDisable= {false}
                renderButtons={(valid, readElements) =>
                    <div className="centered">
                      <a className="afi-btn afi-btn-primary"
                        onClick={(ev) => handleSubmit(valid, readElements, ev)}>
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
            

          

        </VForm>
      </Base>

  )
}

export {Demo}
