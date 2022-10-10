import React       from 'react'
import VInputCheckbox from './VInputCheckbox.mjs'

const VInputCheckbox2 = (props) => {

  const style= {
    /*width: "calc(100% - 2.6em)",*/ 
    minWidth: "70px",
    border: "1px solid #c2cfd6", 
    left: "0", 
    paddingTop: "0.2em", 
    paddingLeft: "3.5em"
  }
  if (props?.bsSize=='lg') {
    style.height= '48px'
    style.paddingTop= '0.75em'
  }

  return (

    <VInputCheckbox {...
        {...props,
          formGroupStyle: {verticalAlign: "middle"},
          inputStyle : style,
          checkboxLabel: undefined,
          icon: props.icon===false ? props.icon : props.checkboxLabel
        }
      }/>
  )
}

VInputCheckbox2.propTypes = VInputCheckbox.propTypes

VInputCheckbox2.defaultProps = {
  ...VInputCheckbox.defaultProps
}

export default VInputCheckbox2
