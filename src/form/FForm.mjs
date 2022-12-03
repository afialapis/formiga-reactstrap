import React from 'react'
import PropTypes from 'prop-types'
import {useForm} from 'formiga'
import FFormButtons from './FFormButtons'

const FForm = (props) => {
  const {id, children, className, onSave, onCancel, colors, icons, labels, autoDisable, disabled, renderButtons, inline}= props
  const form = useForm()

  return (
    <form 
      ref = {form.ref}
      id = {id}
      className  = {`formiga-reactstrap-form ${className!=undefined ? className : ''} ${inline==true ? 'inline' : ''}`}
      noValidate = {true}>
      <>
        {children}
        {renderButtons==undefined
         ? <FFormButtons  onSave      = {onSave!=undefined ? (ev) => onSave(form.valid, form.elements, ev) : undefined}
                          onCancel    = {onCancel!=undefined ? (ev) => onCancel(form.valid, form.elements, ev) : undefined}
                          colors      = {colors}
                          icons       = {icons}
                          labels      = {labels}
                          autoDisable = {autoDisable}
                          disabled    = {disabled}
                          valid       = {form.valid}
                          elements    = {form.elements}/>
         : renderButtons(form.valid, form.elements)}
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
  inline       : PropTypes.bool
}

FForm.defaultProps = {
  icons      : ['ban', 'save'],
  autoDisable: true,
  inline     : false
}


export default FForm