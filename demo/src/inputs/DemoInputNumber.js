import React, {useState} from 'react'
import {FInputFloat, FInputInt, FInputUInt, FInputFloatSum} from '../../../src'

function sumArray(a) {
  try {
    return a.reduce((x, y) => x + y, 0);
  } catch(_) {
    return 0.0
  }
}

const DemoInputNumber = (options) => {

  const [pills, setPills]= useState(2.5)
  const [weight, setWeight]= useState(105)
  const [size, setSize]= useState(6 /*1.44*/)
  const [km, setKm]=  useState([0.1000, 1.453]) // useState(undefined) // useState([0.1000, 1.453]) // [0.1000, 1.453])

  return (
    <>
      <FInputUInt
              name        = {'pills'}
              value       = {pills}
              onChange    = {(v) => setPills(v)}
              required    = {false}
              step        = {2}
              checkValue  = {(v) => v>=6}
              label       = {"How many pills per dose would you like?"}
              description = {"Some >=6 unsigned integer (step = 2)."}
              feedback    = {'Hey folk, give yourself a bit of fun!'}
              {...options}
              >
      </FInputUInt>        

      <FInputInt
              name        = {'weight'}
              value       = {weight}
              onChange    = {(v) => setWeight(v)}
              required    = {true}
              label       = {"Hmm... sounds like too much pills. How much do you weight?"}
              description = {"Some int (step = 1, default). Greater than zero -trough checkValue-."}
              checkValue  = {(v) => {
                //console.log(`weight checkValue ${typeof v} ${v}`)
                return parseInt(v)>0
              }}
              {...options}
              >
      </FInputInt>           

      <FInputFloat
              name        = {'size'}
              value       = {size}
              onChange    = {(v, c) => { /*console.log(`changing size to ${typeof v} ${v} ${c}`);*/ setSize(v)}}
              label       = {"Still not sure... Your size?"}
              description = {"Some float (max 2 decimals, step = 0.01, greater than zero -trough gt-)."}
              step        = {0.01}
              decimals    = {2}
              decimalSign = {','}
              required    = {true}
              gt          = {0}
              {...options}
              >
      </FInputFloat>
      
      
      <FInputFloatSum
              name        = {'km'}
              value       = {km}
              onChange    = {(v, c) => { /*console.log(`changing km to ${typeof v} ${v}, totaling ${sumArray(v)} - ${c}`);*/ setKm(v)}}
              label       = {"You are not a sporty guy, right? How far did your last walks took?"}
              description = {"Some float (max 4 decimals, step = 0.01)."}
              step        = {0.01}
              decimals    = {4}
              decimalSign = {','}
              required    = {true}
              {...options}
              >
      </FInputFloatSum>    
     
    </>
  )
}

export {DemoInputNumber}
