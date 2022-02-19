import {useCallback} from 'react'
import {useInnerValue} from './useInnerValue'

const useValueProps = (props, eventName= 'onBlur') => {
  const {onChange}= props
  
  const [initialValue, innerValue, setInnerValue] = useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.value
    
    setInnerValue(value)

    if (onChange!=undefined) {
      onChange(value, false, event)
    }

  }, [setInnerValue, onChange])

  const handleBlur = useCallback((event) => {
    const value= event.target.value
    
    if (value!=initialValue.current) {
      if (onChange!=undefined) {
        onChange(value, true, event)
      }      
    }
  }, [initialValue, onChange])


  let valueProps= 
    {value      : innerValue || '',
     onChange   : handleChange,
     [eventName]: handleBlur
    }
  
  return [valueProps]
}  

export {useValueProps}