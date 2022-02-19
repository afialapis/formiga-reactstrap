import React       from 'react'
import PropTypes   from 'prop-types'
import _VInputDate from './_VInputDate'
import {isoToDate} from './helpers/isoToDate'


const strToISO = (value) => {
  if (typeof value == 'string' && value.length>0) {
    /*
    if (value=='today') {
      const today= new Date()
      const date= new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      return date.toISOString()
    }
    */

    const date= isoToDate(value)
    
    if (date==undefined || date=='') {
      return ''
    }

    return date.toISOString()
  }
  return undefined
}

const strFromISO = (value) => {
  const pad = (n) => n.toString().padStart(2, '0')

  const date= isoToDate(value)
  if (date==undefined || date=='') {
    return ''
  }

  const day= date.getDate()
  const month= date.getMonth()+1
  const year= date.getFullYear()
  return `${pad(day)}/${pad(month)}/${year}`
}


const VInputDate = (props) => {
 
  return (

    <_VInputDate {...
        {...props,
          transform: {fromISO: strFromISO,
                      toISO  : strToISO}
        }
      }/>
  )
}

VInputDate.propTypes = {
  ..._VInputDate.propTypes,
  value: PropTypes.string
}

VInputDate.defaultProps = {
  ..._VInputDate.defaultProps,
  
}

export default VInputDate
