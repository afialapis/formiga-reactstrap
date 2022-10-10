import {useState, useEffect} from 'react'
/*

  NOTE

  If provided options is a simple object, remember that keys will be always treated as strings.
  This Note should be on the Select component docs!

*/


const useEnabledOptions = (options, allowedValues, disallowedValues) => {
  const [enabledOptions, setEnabledOptions]= useState([])

  useEffect(() => {
    const getFromArrayOfArray = (a) => {
      const enabledOptions= []
      a.map((opt) => {
        const optValue= opt[0] 
        const optLabel= opt[1] || optValue
        const optDisabled= opt.length>=3 ? opt[2] : false
        enabledOptions.push({
          value: optValue,
          label: optLabel,
          disabled: optDisabled
        })
      })
      return enabledOptions    
    }

    const getFromArrayOfObject = (a) => {
      const enabledOptions= []
      a.map((opt) => {
        const optValue= opt.value 
        const optLabel= opt?.label || optValue
        const optDisabled= opt?.disabled || false
        enabledOptions.push({
          value: optValue,
          label: optLabel,
          disabled: optDisabled
        })
      })
      return enabledOptions    
    }

    const getFromObject = (a) => {
      const enabledOptions= []
      Object.entries(a).map((opt) => {
        const optValue= opt[0]
        const optLabel= opt[1]
        enabledOptions.push({
          value: optValue,
          label: optLabel,
          disabled: false
        })
      })
      return enabledOptions    
    }  

    const isAnArray = (v) => 
      Object.prototype.toString.call( v ) === '[object Array]' 

    
    const isDisallowed = (v) => {
      if (disallowedValues) {
        if (disallowedValues.indexOf(v)>=0) {
          return true
        }
      }
      return false
    }

    const isAllowed = (v) => {
      if (allowedValues) {
        if (allowedValues.indexOf(v)>=0) {
          return true
        }
        return false
      }
      return true
    }


    let optionsList= []

    if (! isAnArray(options)) {
      if (Object.keys(options).length>0) {
        optionsList= getFromObject(options)
      }
    } else {
      if (options.length>0) {
        const first= options[0]
        if (isAnArray(first)) {
          optionsList= getFromArrayOfArray(options)
        } else {
          optionsList= getFromArrayOfObject(options)
        }
      }
    }

    const nEnabledOptions = optionsList.map((opt) => {
      return {
        value   : opt.value,
        label   : opt.label,
        disabled: opt.disabled || isDisallowed(opt.value) || !isAllowed(opt.value)
      }
    })

    setEnabledOptions(nEnabledOptions)
  }, [options, allowedValues, disallowedValues])

  
  return [enabledOptions]
}


export {useEnabledOptions}