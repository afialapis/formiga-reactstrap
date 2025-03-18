import React from 'react'
import {FForm} from '../../src'




export const DemoForm = ({options, INPUT_TYPES, onChangeElements}) => {

  console.log(`[demo-form] Render`)  

  return (  
    <FForm  onSave     = {(valid, elements) => onChangeElements(elements)} 
            onCancel   = {undefined}
            autoDisable= {false}
            getElements= {(valid, elements) => onChangeElements(elements)}
            renderButtons={(valid, elements) => 
                <div className="centered">
                  <a className={`afi-btn afi-btn-primary ${valid ? '' : 'disabled'}`}
                    onClick={(ev) => onChangeElements(elements)}>
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
        
  )
}
