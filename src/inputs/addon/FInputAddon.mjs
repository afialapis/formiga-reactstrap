import React /*, {useRef, useState, useEffect}*/ from 'react'
import {
  FormGroup,
  FormText,
  FormFeedback,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap'
import FIcon from '../../commons/icons/FIcon.mjs'
import shouldShowValidity /*, {showValidityMerge}*/ from '../helpers/valid/shouldShowValidity.mjs'
import getValidClassnames from '../helpers/valid/getValidClassnames.mjs'

const FInputAddon = (props) => {
  const {input, name, label, description, icon, children, inline= false, formClassName, 
    showValidity, keepHeight= false, formGroupStyle, inputGroupStyle, middleElement, bsSize,
    formGroupProps, noMargin= false}= props

  //const originalValue = useRef(value)
  
  //const [loaded, setLoaded]= useState(false)

  // useEffect(() => {
  //   setLoaded(true)
  // }, [])

  //const hasChanged= loaded && (value != originalValue.current)

  const {message: showMessage}= shouldShowValidity(input, showValidity)
  const validClass= getValidClassnames(input, showValidity, true)

  //console.log(`Addon ${name} ready ${input?.node !== undefined} value ${input?.node?.value} hasChanged ${input?.hasChanged} valid: ${input.valid} showMessage: ${showMessage} vMsg: ${input.validationMessage}`)

  return (
    <FormGroup className={`formiga-reactstrap-form-group ${input?.hasChanged ? 'is-unsaved' : ''} ${inline===true ? 'inline' : ''} ${formClassName || ''} ${label!==undefined ? 'with-label' : ''} ${description!==undefined ? 'with-description' : ''} ${icon!==false ? 'with-icon' : ''}`}
               style={formGroupStyle}
               {...formGroupProps || {}}
               noMargin={noMargin}>
      {label!=undefined
       ? <Label for={name}
                className="formiga-reactstrap-label">
          {label}
        </Label>
       : null}
      <InputGroup style={inputGroupStyle} size={bsSize} className={`${bsSize ? `input-group-${bsSize}` : ''} ${validClass}`}>
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
      { ((description!=undefined) && (description.length>0))
       ? <FormText
            className="formiga-reactstrap-description">
          {description}
        </FormText>
       : null
      }
      { (showMessage && (input.validationMessage!=undefined) && (input.validationMessage!=""))
        ? 
          <FormFeedback
            className={`formiga-reactstrap-validation-message`}
            valid={input.valid}>
            {input.validationMessage}
        </FormFeedback>          

        : (keepHeight===true) 
        ? <FormFeedback
            className={`formiga-reactstrap-validation-message formiga-reactstrap-validation-message-keep-height`}
            valid={true}>
          <>&nbsp;</>
        </FormFeedback>   
        : null
      }
    </FormGroup>
  )
}

export {FInputAddon}