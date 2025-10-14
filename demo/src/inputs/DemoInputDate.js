import React, {useState} from 'react'
import {FInputDateIso, FInputDate, FInputEpoch} from '../../../src'

const _getTodayDate = (add= 0) => {
  const n= new Date()
  n.setUTCHours(0,0,0,0);
  if (add) {
    n.setDate(n.getDate() + add);
  }
  return n
}

//const getTodayUnix = (add= 0) => {
//  const n= _getTodayDate(add)
//  return n.getTime() / 1000
//}

const getToday = (add= 0) => {
  const pad = (n) => n.toString().padStart(2, '0')
  const n= _getTodayDate(add)
  const day= n.getDate()
  const month= n.getMonth()+1
  const year= n.getFullYear()
  return `${pad(day)}/${pad(month)}/${year}`  
}


const getTodayISO = (add= 0) => {
  const n= _getTodayDate(add)
  return n.toISOString()
}

const DemoInputDate = (options) => {
  const [when, setWhen]= useState(getTodayISO(1))
  const [whin, setWhin]= useState(getToday(1))
  const [whon, setWhon]= useState(1404424800 /*getTodayUnix(1)*/)

  return (
    <>

      <FInputDateIso
             name             = {'when'}
             value            = {when}
             onChange         = {(v) => setWhen(v)}
             disallowedValues = {[getTodayISO()]}
             label            = {"When will you take your next Formiga?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             {...options}
             />
      <FInputDate
             name             = {'whin'}
             value            = {whin}
             onChange         = {(v) => setWhin(v)}
             disallowedValues = {[getToday()]}
             label            = {"When will you take your next Formiga?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             {...options}
             />             

      <FInputEpoch
             name             = {'whon'}
             value            = {whon}
             onChange         = {(v) => setWhon(v)}
             disallowedValues = {[1404165600 /*getTodayUnix()*/]}
             label            = {"When will you take your next Formiga?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             locale           = 'es'
             {...options}
      />
      
    </>          
  )
}

export {DemoInputDate}