import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useValueProps} from './value/useValueProps'
import {withFormiga} from './formiga/withFormiga'

const _VInputTime = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, showValidProps,
    autocomplete, inputStyle, bsSize}= props

  const [valueProps]= useValueProps(props)


  return (
      <Input  id          = {id}
              name        = {name}
              innerRef    = {inputRef}
              type        = {"time"}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              bsSize      = {bsSize}
              {...valueProps}
              {...showValidProps}
    />
  )
}

const VInputTime = withFormiga(withAddon(_VInputTime))

VInputTime.propTypes = {
  ...inputPropTypes,
  placeholder  : PropTypes.string,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputTime.defaultProps = {
  ...inputDefaultProps,
  icon: 'time'
}


export default VInputTime