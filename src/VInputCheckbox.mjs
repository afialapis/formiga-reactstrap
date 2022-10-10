import React from 'react'
import PropTypes from 'prop-types'
import {inputPropTypes} from './props/inputPropTypes.mjs'
import {inputDefaultProps} from './props/inputDefaultProps.mjs'
import {withAddon} from './addon/withAddon.mjs'
import {useCheckedProps} from './value/useCheckedProps.mjs'
import {withFormiga} from './formiga/withFormiga.mjs'


const _VInputCheckbox = (props) => {
  const [checkedProps]= useCheckedProps(props)

  const {id, name, inputRef, readOnly, required, 
         inputStyle, checkboxLabel, valid, showValidity, bsSize}= props

  const makeId = () => {
    return id!=undefined 
           ? id
           : name !=undefined
             ? `formiga-reactstrap-checkbox-${name}`
             : `unique_value_here_please`
  }

  return (    
    <div className    = {`custom-switch custom-control `}
          /* better styling on the div, it is not very useful on the input here */
          style        = {inputStyle} > 
          <input type     = "checkbox" 
                 id       = {makeId()} 
                 name     = {name} 
                 className= {`custom-control ${bsSize!=undefined ? 'custom-control-'+bsSize : ''} custom-control-input ${(showValidity==1 || showValidity==4) ? valid ? 'is-valid' : 'is-invalid' : ''}`}
                 ref      = {inputRef}
                 disabled = {readOnly!=undefined ? readOnly  : false}
                 required = {required}
                 {...checkedProps}
          />
          <label className="custom-control-label"
                  htmlFor={makeId()}>{checkboxLabel}</label>
        </div>            
       )
}

const VInputCheckbox= withFormiga(withAddon(_VInputCheckbox))


VInputCheckbox.propTypes = {
  ...inputPropTypes,
  checkboxLabel : PropTypes.string,
}

VInputCheckbox.defaultProps = {
  ...inputDefaultProps,
  icon: 'checkmark',
}

export default VInputCheckbox
