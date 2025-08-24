import React, {useRef, useState, useEffect, useCallback} from 'react'
import useInputWrap from '../../../helpers/useInputWrap.mjs'
import {FInputAddon} from '../../../addon/FInputAddon.mjs'
import {useEnabledOptions}         from '../useEnabledOptions.mjs'
import {parseValueDependOnOptions} from '../parseValueDependOnOptions.mjs'
import FISSHidden from './FISSHidden.mjs'
import FISSInput from './FISSInput.mjs'
import FISSAction from './FISSAction.mjs'
import FISSList from './FISSList.mjs'
import withWrapControlled from '../../../helpers/props/withWrapControlled.mjs'
import {useInput} from 'formiga'

const getOptionsLabel = (options, value) => {
  const elOpt= options.find((opt) => opt.value==value)
  return elOpt?.label || ''
}

const trimFormigaProps = (props) => {
  return {
    originalValue: props?.defaultValue || props?.value,
    transformValue: props?.transformValue,
    checkValue: props?.checkValue,
    allowedValues: props?.allowedValues,
    disallowedValues: props?.disallowedValues,
    doRepeat: props?.doRepeat,
    doNotRepeat: props?.doNotRepeat,
    decimals: props?.decimals,
    validationMessage: props?.validationMessage,
    inputFilter: props?.inputFilter,  
  }
}

const FInputSelectSearchBase = (props) => {
  const {options, 
         allowedValues, disallowedValues,
         creatable, onCreate, 
         value, setValue, icon= 'search', readOnly
         } = props
  
  const wrapperRef    = useRef(undefined)
  const filterRef     = useRef(undefined)
  const listRef       = useRef(undefined)

  const [isOpen, setIsOpen]= useState(false)
  const [optionsMap, setOptionsMap]= useState([])
  const [optActive, setOptActive]= useState(undefined)
  const [shownText, setShownText]= useState('')
  const [creating, setCreating]= useState(false)

  const enabledOptions= useEnabledOptions(options, allowedValues, disallowedValues)

  /*const input = useInputWrap(props, {
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(parseValueDependOnOptions(v, enabledOptions))
                : undefined    
  })*/

  const input = useInput(trimFormigaProps(props), {
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(parseValueDependOnOptions(v, enabledOptions))
                : undefined    
  })

  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (listRef && listRef.current && !listRef.current.contains(event.target)) {
          handleSearchAbort(event)
        }
      }    
    }    

    document.addEventListener('mousedown', onClickOutside)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  })

  useEffect(() => {
    const nShownText= getOptionsLabel(enabledOptions, value)
    setShownText(nShownText)
    
  }, [enabledOptions, value])
  
  useEffect(() => {
    const sfilter= shownText ? shownText.toLowerCase() : ''
    const nOptionsMap= enabledOptions
          .filter((opt) => sfilter.length>0 ? opt.label.toLowerCase().includes(sfilter) : true)
    setOptionsMap(nOptionsMap)
    if (shownText.length>0 && creatable) {
      if (nOptionsMap.length==0) {
        setCreating(true)
      }
    }
  }, [shownText, enabledOptions, creatable])

  const handleChange = useCallback((tValue, event) => {
    if (readOnly) return
    const nValue= parseValueDependOnOptions(tValue, enabledOptions)
    setValue(nValue, true, event)
    input.setValue(nValue)
    
    const nShownText= getOptionsLabel(enabledOptions, tValue)
    setShownText(nShownText)

    if (nShownText.length==0) {
      setCreating(false)
    }
    
    input.validate()
  }, [readOnly, input, setValue, enabledOptions])

  const handleSearchStart = useCallback((_event) => {
    if (readOnly) return
    if (! isOpen) {
      setIsOpen(true)
    }
    setOptActive(undefined)
  }, [readOnly, isOpen])

  const handleSearchType = useCallback((event) => {
    if (readOnly) return
    setShownText(event.target.value)
    handleSearchStart(event)
    if (event.target.value.length==0) {
      setCreating(false)
    }
        
  }, [readOnly, handleSearchStart])

  const handleSearchAbort = useCallback((event) => {
    if (readOnly) return
    setIsOpen(false)
    setOptActive(undefined)
    if (shownText=='') {
      handleChange('', event)
    }
  }, [readOnly, shownText, handleChange])

  const handleSelect = useCallback((newValue, event) => {
    if (readOnly) return
    setIsOpen(false)
    setOptActive(undefined)
    handleChange(newValue, event)
  }, [readOnly, handleChange])

  const handleClear = useCallback((event) => {
    if (readOnly) return
    setIsOpen(true)
    setOptActive(undefined)
    setCreating(false)
    handleChange('', event)
  }, [readOnly, handleChange])

  const handleKeyDown = useCallback((event) => {
    if (readOnly) return
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      
      if (isOpen) {
        if (optionsMap.length>0) {
          const factor = event.key=='ArrowUp' ? -1 : 1
          const nOptActive= optActive==undefined
                ? 0
                : optActive + factor

          setOptActive(nOptActive)
        }
      }
    }
    if (event.key=='Enter') {
      event.preventDefault()
      if (isOpen) {
        if (optionsMap.length>0) {
          if (optActive!=undefined) {
            const opt= optionsMap[optActive]
            if (opt?.disabled!==true) {
              const nValue= opt.value
              handleSelect(nValue, event)
            }
          }
        }
      }
    }
    return true
  }, [readOnly, isOpen, optActive, optionsMap, handleSelect])

  const handleCreate = useCallback((event) => {
    if (readOnly) return

    if (onCreate!=undefined) {
      onCreate(shownText, event)
    }
    setCreating(false)
  }, [readOnly, shownText, onCreate])  


  return (

      <div className="formiga-reactstrap-select-search"
            ref = {wrapperRef}>
        
          <FInputAddon {...props}
                 icon = {icon}
                 input   = {input}
                 >
            {/* Hidden input */}
            <FISSHidden {...props}
                        inputRef = {input.ref}/>
            {/* filter input */}
            <FISSInput {...props}
                      input = {input}
                      filterRef = {filterRef}
                      shownText = {shownText}
                      onSearchStart = {handleSearchStart}
                      onSearchType = {handleSearchType}
                      onKeyDown = {handleKeyDown}
                      />
            {/* Add or clear icon */}
            <FISSAction {...props}
                        shownText = {shownText}
                        creating= {creating}
                        onCreate= {handleCreate}
                        onClear = {handleClear}/>    


            {isOpen
            ? <FISSList {...props}
                        listRef = {listRef}
                        optionsMap = {optionsMap}
                        onSelect = {handleSelect}
                        optActive = {optActive}/>
            : null
            }

          </FInputAddon>
        
        
      
      </div>
  )
}

const FInputSelectSearch = withWrapControlled(FInputSelectSearchBase)


export default FInputSelectSearch