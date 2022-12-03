import React, {useState, useEffect, useRef} from 'react'
import FIcon       from '../commons/icons/FIcon.mjs'
import { Button }  from 'reactstrap'


const FFormButtons = ({onSave, onCancel, colors, icons, labels, autoDisable, disabled, valid, elements}) => {
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
        ? disabled(valid, elements)
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
            <FIcon icon  = {icons[0]}/>
            {labels ? labels[0] : 'Cancelar'}
          </Button>
        : null
      }
      {onSave!=undefined
        ? <Button color  = {colors ? colors[1] : 'primary'}
                onClick  = {(ev) => handleSave(ev)}
                disabled = {isSaving || isDisabled}>
            <FIcon icon  = {icons[1]}/>
            {labels ? labels[1] : 'Guardar'}
          </Button>
        : null
      }
    </div> 
  )
}

export default FFormButtons
