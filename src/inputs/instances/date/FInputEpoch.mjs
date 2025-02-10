import React       from 'react'
import FInputDateBase from './FInputDateBase.mjs'
import {isoToDate} from './isoToDate.mjs'

const dateAdjustOffset = (d, f) => {
  const offs= d.getTimezoneOffset() * f
  const msecs= offs * 60 * 1000
  d.setTime(d.getTime() + msecs)
  return d
}


const unixToISO = (value) => {
  if ((!value) || isNaN(value))  {
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


const FInputEpoch = (props) => {
 
  return (

    <FInputDateBase {...
        {...props,
          transform: {fromISO: unixFromISO,
                      toISO: unixToISO}
        }
      }/>
  )
}


export default FInputEpoch
