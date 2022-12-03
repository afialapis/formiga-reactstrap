import {useState, useEffect} from 'react'

const _getSize = (size, value, options) => {

  if (typeof size == 'function') {
    try {
      return size(value, options)
    } catch(e) {
      console.error(e)
    }
  }

  if (!isNaN(size)) {
    return parseInt(size)
  }

  if (Array.isArray(options)) {
    return options.length
  }
  try {
    return Object.keys(options).length
  } catch(e) {
    console.error(e)
  }
  return 2
}

const useSize = (size, value, options) => {
  const [theSize, setTheSize]= useState(_getSize(size, value, options))


  useEffect(( )=> {
    setTheSize(_getSize(size, value, options))
  }, [size, value, options])

  return theSize
}

export default useSize
