import React from 'react'
import {VInputCheckbox2, VInputSelect} from '../../../src'
import {VForm} from '../../../src'

const BaseSidebar = ({options, resume, onChangeOption}) => {

  return (
    <aside>

      <h2>Options</h2>
      <div className="mgbottom">
        <VForm  onSave     = {() => {}} 
                onCancel   = {undefined}
                autoDisable= {false}
                renderButtons={() => null}
                >

          <div>
              <VInputCheckbox2
                            name         = {'keepHeight'}
                            value        = {options.keepHeight}
                            onChange     = {(v) => onChangeOption('keepHeight', v)}
                            checkboxLabel= {'Keep Height'}
                            bsSize       = "sm"
                            showValidity = {0}
                            />
              <VInputCheckbox2
                            name         = {'icon'}
                            value        = {options.icon}
                            onChange     = {(v) => onChangeOption('icon', v)}
                            checkboxLabel= {'Show Icon'}
                            bsSize       = "sm"
                            showValidity = {0}
                            />
              <VInputSelect
                            name         = {'showValidity'}
                            value        = {options.showValidity}
                            onChange     = {(v) => onChangeOption('showValidity', v)}
                            icon         = {'Show Validity'}
                            options = {[
                              [0, 'Nothing'],
                              [1, 'Only input colors when invalid'],
                              [2, 'Only feedback when invalid'],
                              [4, 'Feedback and input colors']
                            ]}
                            bsSize       = "sm"
                            showValidity = {0}
                            />    
              <VInputSelect
                            name         = {'bsSize'}
                            value        = {options.bsSize}
                            onChange     = {(v) => onChangeOption('bsSize', v)}
                            icon         = {'Size'}
                            options = {[
                              ['lg', 'Large'],
                              [''  , 'Normal'],
                              ['sm', 'Small']
                            ]}
                            bsSize       = "sm"
                            showValidity = {0}
                            />                                                                                           
          </div>
        </VForm>
      </div>

      {resume.length>0
      ?  <>
            <h2>Resume</h2>

            <div className="log">
              {resume.map((s, i) => 
                <div key={`log_line_${i}`}
                    className="log_line" style={{...s.style || {}}}>{s.msg}</div>
              )}
            </div>
          </>
      : null}
    </aside>
  )
}

export {BaseSidebar}