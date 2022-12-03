import React, {useState} from 'react'
import {FInputTime} from '../../../src'

const DemoInputTime = (options) => {
  const [time, setTime]= useState('12:34')
  return (
      <FInputTime
             name        = {'time'}
             required    = {true}
             label       = {"What time do you take your pills at?"}
             description = "Between 12:00 and 14:00"
             onChange    = {(f) => {console.log(f); setTime(f)}}
             value       = {time}
             min         = {"12:00"}
             max         = {"14:00"}
             clearable   = {true}
             {...options}/>   
  )
}

export {DemoInputTime}

