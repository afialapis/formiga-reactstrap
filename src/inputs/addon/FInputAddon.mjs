import React, {useRef, useState, useEffect} from 'react'
import {
  FormGroup,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap'
import FInputFeedback from './FInputFeedback'
import FIcon from '../../commons/icons/FIcon.mjs'

const FInputAddon = (props) => {
  const {name, value, label, description, feedback, icon, valid, children, inline, formClassName, 
    showValidity, keepHeight, formGroupStyle, inputGroupStyle, middleElement, bsSize}= props

  const originalValue = useRef(value)
  
  const [loaded, setLoaded]= useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const hasChanged= loaded && (value != originalValue.current)

  return (
    <FormGroup className={`formiga-reactstrap-form-group ${hasChanged ? 'is-unsaved' : ''} ${inline===true ? 'inline' : ''} ${formClassName || ''}`}
               style={formGroupStyle}>
      {label!=undefined || description!=undefined
       ? <div className="formiga-reactstrap-label-container">
          {label!=undefined
          ? <Label for={name}
                    className="formiga-reactstrap-label">
              {label}
            </Label>
          : null
          }
          {description!=undefined
           ? 
            <div className="formiga-reactstrap-description">
              {description}
            </div>
           : null}
        </div>
      : null}
      <InputGroup style={inputGroupStyle} size={bsSize} className={bsSize ? `input-group-${bsSize}` : ''}>
        {icon===false
          ? null
          : 
            <span className="input-group-prepend">
              <InputGroupText className="input-group-addon">
                {icon==undefined
                ? ''
                : <FIcon icon={icon}/>
                }
              </InputGroupText>
            </span>
        }
        {children}
      </InputGroup>
      {middleElement!=undefined
       ? middleElement
       : null
      }
      {((keepHeight===true || feedback!=undefined) && showValidity>=2)
        ? <FInputFeedback valid     = {valid}
                          feedback  = {feedback}
                          keepHeight= {keepHeight}
                          />
        : null
      }
    </FormGroup>
  )
}

export {FInputAddon}