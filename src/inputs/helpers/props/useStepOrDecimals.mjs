import {useEffect, useState} from 'react'

const _getStepOrDecimals = (step, decimals) => {

  if (step!=undefined) {
    if (! isNaN(step)) {
      return step
    }
  }
  if (decimals!=undefined) {
    if (! isNaN(decimals)) {
      return 1/Math.pow(10,decimals)
    }
  }  
  return undefined
}

const useStepOrDecimals = (step, decimals) => {

  const [nStep, setNStep]= useState(_getStepOrDecimals(step, decimals))

  useEffect(() => {
    setNStep(_getStepOrDecimals(step, decimals))
  }, [step, decimals])
  
  return nStep
}

export default useStepOrDecimals