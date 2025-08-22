import React from 'react'
import {useForm} from 'formiga'
import FFormButtons from './FFormButtons'

const _DEFAULT_ICONS = ['ban', 'save']

const FForm = (props) => {
  const {id, children, className, onSave, onCancel, colors, icons= _DEFAULT_ICONS,
         labels, autoDisable= true, disabled, renderButtons, buttonsStyle, inline= false,
         renderChildren}= props
  
  const f_form = useForm()
  const { ref, hasChanged} = f_form

  return (
    <form 
      ref = {ref}
      id = {id}
      className  = {`formiga-reactstrap-form ${className!=undefined ? className : ''} ${inline==true ? 'inline' : ''} ${hasChanged ? 'formiga-reactstrap-form-changed' : ''}`}
      noValidate = {true}>
      <>
        {renderChildren==undefined
         ? children
         : renderChildren(f_form)}
        {renderButtons==undefined
         ? <FFormButtons  onSave      = {onSave!=undefined ? (ev) => onSave(ev, f_form) : undefined}
                          onCancel    = {onCancel!=undefined ? (ev) => onCancel(ev, f_form) : undefined}
                          colors      = {colors}
                          icons       = {icons}
                          labels      = {labels}
                          autoDisable = {autoDisable}
                          disabled    = {disabled}
                          form        = {f_form}
                          buttonsStyle= {buttonsStyle}/>
         : renderButtons(f_form)}
      </>
    </form>
  )
}


export default FForm