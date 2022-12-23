import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {useForm} from 'formiga'
import FFormButtons from './FFormButtons'

const FForm = (props) => {
  const {id, children, className, onSave, onCancel, colors, icons,
         labels, autoDisable, disabled, renderButtons, inline,
        getElements, isValid}= props
  const {ref, valid, elements} = useForm()
  
  useEffect(() => {
    if (getElements) {
      getElements(elements)
    }
    if (isValid) {
      getElements(valid)
    }
  }, [valid, elements, isValid, getElements])

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

FForm.propTypes = {
  className    : PropTypes.string,
  id           : PropTypes.string,
  colors       : PropTypes.arrayOf(PropTypes.string),
  icons        : PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func])),
  labels       : PropTypes.arrayOf(PropTypes.string),
  onSave       : PropTypes.func,
  onCancel     : PropTypes.func,
  autoDisable  : PropTypes.bool,
  disabled     : PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  renderButtons: PropTypes.func,
  inline       : PropTypes.bool,
  getElements  : PropTypes.func,
  isValid      : PropTypes.func
}

FForm.defaultProps = {
  icons      : ['ban', 'save'],
  autoDisable: true,
  inline     : false
}


export default FForm