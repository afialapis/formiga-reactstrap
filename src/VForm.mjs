import React, {useState, useEffect, useRef} from 'react'
import PropTypes   from 'prop-types'
import {useForm}   from 'formiga'
import VIcon       from './icons/VIcon.mjs'
import { Button }  from 'reactstrap'


const VFormButtons = ({onSave, onCancel, colors, icons, labels, autoDisable, disabled, valid, readElements}) => {
  const [isSaving, setIsSaving]= useState(false)
  const isMounted= useRef(undefined)
  
  useEffect(() => {
    isMounted.current= true

    return () => {
      isMounted.current= false
    }
  }, [])

  const isDisabled= autoDisable
    ? !valid
    : (
      typeof disabled=="function"
        ? disabled(valid, readElements)
        : disabled
    )  

  const handleSave = (ev) => {
    setIsSaving(true)

    const result= onSave(ev)
    if (result == Promise.resolve(result)) {
      result.then((_) => {
        if (isMounted.current) {
          setIsSaving(false)
        }
      })
    } else {
      setIsSaving(false)
    }
    
  }

  return (
    <div className="formiga-reactstrap-buttons">
      {onCancel!=undefined
        ? <Button color   = {colors ? colors[0] : 'secondary'}
                  onClick = {(ev) => onCancel(ev)}>
            <VIcon icon  = {icons[0]}/>
            {labels ? labels[0] : 'Cancelar'}
          </Button>
        : null
      }
      {onSave!=undefined
        ? <Button color  = {colors ? colors[1] : 'primary'}
                onClick  = {(ev) => handleSave(ev)}
                disabled = {isSaving || isDisabled}>
            <VIcon icon  = {icons[1]}/>
            {labels ? labels[1] : 'Guardar'}
          </Button>
        : null
      }
    </div> 
  )
}


const VForm = (props) => {
  const {id, children, className, onSave, onCancel, colors, icons, labels, autoDisable, disabled, renderButtons, inline}= props
  const [formRef, valid, readElements] = useForm()

  return (
    <form 
      ref = {formRef}
      id = {id}
      className  = {`formiga-reactstrap-form ${className!=undefined ? className : ''} ${inline==true ? 'inline' : ''}`}
      noValidate = {true}>
      <>
        {children}
        {renderButtons==undefined
         ? <VFormButtons  onSave      = {onSave!=undefined ? (ev) => onSave(valid, readElements, ev) : undefined}
                          onCancel    = {onCancel!=undefined ? (ev) => onCancel(valid, readElements, ev) : undefined}
                          colors      = {colors}
                          icons       = {icons}
                          labels      = {labels}
                          autoDisable = {autoDisable}
                          disabled    = {disabled}
                          valid       = {valid}
                          readElements= {readElements}/>
         : renderButtons(valid, readElements)}
      </>
    </form>
  )
}

VForm.propTypes = {
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

VForm.defaultProps = {
  icons      : ['ban', 'save'],
  autoDisable: true,
  inline     : false
}


export default VForm