import React, { useState, useEffect } from 'react'
import {useForm} from 'formiga'
import FFormButtons from './FFormButtons'

const _DEFAULT_ICONS = ['ban', 'save']

const FForm = (props) => {
  const {id, children, className, onSave, onCancel, colors, icons= _DEFAULT_ICONS,
         labels, autoDisable= true, disabled, renderButtons, inline= false,
        getElements}= props
  const [ied, setIed] = useState(false)
  const {node, ref, valid, elements} = useForm()
  
  useEffect(() => {
    if (getElements && (!ied)) {
      console.log(`[FForm] calling getElements with ${elements.length} elems , node is ${node}`)
      if (node) {
        setIed(true)
        getElements(valid, elements)
      }
      
    }
  }, [valid, elements, getElements, node, ied])

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