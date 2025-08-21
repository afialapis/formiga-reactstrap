import React, {useState} from 'react'
import {Base} from './base/Base'
import {FForm} from '../../src'


import DemoInputs from './DemoInputs.js'
import DemoSummary from './DemoSummary.js'


const MENU_ITEMS= [
  {key: 'text',            label: 'text'          },
  {key: 'textarea',        label: 'textarea'      },
  {key: 'number',          label: 'number'        },
  {key: 'date',            label: 'date'          },
  {key: 'time',            label: 'time'          },
  {key: 'checkbox',        label: 'checkbox'      },
  {key: 'select',          label: 'select'        },
  {key: 'select-multiple', label: 'select multiple'},
  {key: 'search',          label: 'search'        },
  {key: 'color',           label: 'color'         },
  {key: 'file',            label: 'file'          },
]



const Demo = () => {
  const [options, setOptions]= useState({
    keepHeight  : false,
    icon        : undefined,
    showValidity: {
      input: 'changes+invalid',
      message: 'changes+invalid'
    },
    bsSize      : 'lg'
  })

  console.log(`[demo] Render`)  
  return (  

      <Base logoSrc = "assets/img/formiga-reactstrap.png"
            menuTitle   = "Input Types"
            menuItems   = {MENU_ITEMS}>
        

        <FForm 
          onSave     = {undefined} 
          onCancel   = {undefined}
          autoDisable= {false}
          renderButtons={(form) => {
                return (
                  <div className="centered">
                    <a className={`afi-btn afi-btn-primary ${form.valid ? '' : 'disabled'}`}
                      onClick={(ev) => {}}>
                      {form.valid ? 'Submit' : 'Invalid yet'}
                    </a>
                  </div>
                )
              }}
            renderChildren={(form) => {
              return (
                <div className="formiga-form-inner">
                  <div className="formiga-inputs">
                    <DemoInputs options={options}/>
                  </div>
                  <aside className="formiga-summary">
                    <DemoSummary form={form}/>
                  </aside>
                </div>
              )
            }}>
        
        </FForm>          

        

      </Base>

  )
}

export default Demo


