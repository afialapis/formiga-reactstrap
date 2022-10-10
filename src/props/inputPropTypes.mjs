import PropTypes from 'prop-types'

const inputPropTypes = {
  // Props for formiga
  feedback            : PropTypes.string,  
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  doRepeat            : PropTypes.string,
  doNotRepeat         : PropTypes.string, 
  
  id                  : PropTypes.string,
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.string,
  label               : PropTypes.string,
  description         : PropTypes.string,
  icon                : PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func, PropTypes.bool]),
  inline              : PropTypes.bool,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  onChange            : PropTypes.func,
  bsSize              : PropTypes.oneOf(['', 'lg', 'sm']),
  keepHeight          : PropTypes.bool,
  showValidity        : PropTypes.oneOf([0, 1, 2, 4]),
  formGroupStyle      : PropTypes.object,
  inputGroupStyle     : PropTypes.object,
  inputStyle          : PropTypes.object
}

export {inputPropTypes}