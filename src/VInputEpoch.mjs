import React       from 'react'
import PropTypes   from 'prop-types'
import _VInputDate from './_VInputDate.mjs'
import {isoToDate} from './helpers/isoToDate.mjs'

const dateAdjustOffset = (d, f) => {
  const offs= d.getTimezoneOffset() * f
  const msecs= offs * 60 * 1000
  d.setTime(d.getTime() + msecs)
  return d
}


const unixToISO = (value) => {
  if (isNaN(value))  {
    return undefined
  }

  let date = new Date(value * 1000)
  date= dateAdjustOffset(date, -1)
  return date.toISOString()
}

const unixFromISO = (value) => {
  if (! value) {
    return undefined
  }
  const date= dateAdjustOffset(isoToDate(value), 1)
  const usecs= Math.floor(date.getTime()/1000)
  return usecs
}


const VInputEpoch = (props) => {
 
  return (

    <_VInputDate {...
        {...props,
          transform: {fromISO: unixFromISO,
                      toISO: unixToISO}
        }
      }/>
  )
}

VInputEpoch.propTypes = {
  ..._VInputDate.propTypes,
  value: PropTypes.number
}

VInputEpoch.defaultProps = {
  ..._VInputDate.defaultProps,
  
}

export default VInputEpoch
