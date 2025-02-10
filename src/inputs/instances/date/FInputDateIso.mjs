import React       from 'react'
import FInputDateBase from './FInputDateBase.mjs'
import {isoToDate} from './isoToDate.mjs'


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
      // console.log('strToISO value='+value+' => no date')
      return ''
    }
    // console.log('strToISO value='+value+' => '+date.toISOString())
        
    return date.toISOString()
  }
  // console.log('strToISO value='+value+' => undefined')
  return undefined
}

const strFromISO = (value) => {
  //const pad = (n) => n.toString().padStart(2, '0')

  const date= isoToDate(value)

  if (date==undefined || date=='') {
    // console.log('strFromISO value='+value+' => no date')
    return ''
  }
  
  // console.log('strFromISO value='+value+' => '+date.toISOString())

  return date.toISOString()

  //  const day= date.getDate()
  //  const month= date.getMonth()+1
  //  const year= date.getFullYear()
  //
  //  return `${pad(day)}/${pad(month)}/${year}`
}


const FInputDateIso = (props) => {
 
  return (

    <FInputDateBase {...
        {...props,
          transform: {fromISO: strFromISO,
                      toISO  : strToISO}
        }
      }/>
  )
}

export default FInputDateIso
