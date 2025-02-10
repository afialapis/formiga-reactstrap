import React, { useEffect } from 'react'
import {useForm} from 'formiga'
import FFormButtons from './FFormButtons'

const _DEFAULT_ICONS = ['ban', 'save']

const FForm = (props) => {
  const {id, children, className, onSave, onCancel, colors, icons= _DEFAULT_ICONS,
         labels, autoDisable= true, disabled, renderButtons, inline= false,
        getElements}= props
  const {ref, valid, elements} = useForm()
  
  useEffect(() => {
    if (getElements) {
      getElements(valid, elements)
    }
  }, [valid, elements, getElements])

  return (
    <form 
      ref = {ref}
      id = {id}
      className  = {`formiga-reactstrap-form ${className!=undefined ? className : ''} ${inline==true ? 'inline' : ''}`}
      noValidate = {true}>
      <>
        {children}
        {renderButtons==undefined
         ? <FFormButtons  onSave      = {onSave!=undefined ? (ev) => onSave(valid, elements, ev) : undefined}
                          onCancel    = {onCancel!=undefined ? (ev) => onCancel(valid, elements, ev) : undefined}
                          colors      = {colors}
                          icons       = {icons}
                          labels      = {labels}
                          autoDisable = {autoDisable}
                          disabled    = {disabled}
                          valid       = {valid}
                          elements    = {elements}/>
         : renderButtons(valid, elements)}
      </>
    </form>
  )
}


export default FForm