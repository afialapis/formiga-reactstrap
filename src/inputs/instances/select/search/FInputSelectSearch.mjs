import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {useInput} from 'formiga'
import {FInputAddon} from '../../../addon/FInputAddon.mjs'
import {inputPropTypes}  from '../../../props/inputPropTypes.mjs'
import {inputDefaultProps} from '../../../props/inputDefaultProps.mjs'
import {useEnabledOptions}         from '../useEnabledOptions.mjs'
import {parseValueDependOnOptions} from '../parseValueDependOnOptions.mjs'
import FISSHidden from './FISSHidden.mjs'
import FISSInput from './FISSInput.mjs'
import FISSAction from './FISSAction.mjs'
import FISSList from './FISSList.mjs'
import withWrapControlled from '../../../helpers/props/withWrapControlled.mjs'

const getOptionsLabel = (options, value) => {
  const elOpt= options.find((opt) => opt.value==value)
  return elOpt?.label || ''
}

const _FInputSelectSearch = (props) => {
  const {options, feedback,
         allowedValues, disallowedValues, keepHeight, 
         creatable, onCreate, 
         setValue
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

  const input = useInput({
    ...props,
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
    const nValue= parseValueDependOnOptions(tValue, enabledOptions)
    setValue(nValue, true, event)
    input.setValue(nValue)
    
    const nShownText= getOptionsLabel(enabledOptions, tValue)
    setShownText(nShownText)
    
    input.validate()
  }, [input, setValue, enabledOptions])

  const handleSearchStart = useCallback((_event) => {
    if (! isOpen) {
      setIsOpen(true)
    }
    setOptActive(undefined)
  }, [isOpen])

  const handleSearchType = useCallback((event) => {
    setShownText(event.target.value)
    handleSearchStart(event)
  }, [handleSearchStart])

  const handleSearchAbort = useCallback((event) => {
    setIsOpen(false)
    setOptActive(undefined)
    if (shownText=='') {
      handleChange('', event)
    }
  }, [shownText, handleChange])

  const handleSelect = useCallback((newValue, event) => {
    setIsOpen(false)
    setOptActive(undefined)
    handleChange(newValue, event)
  }, [handleChange])

  const handleClear = useCallback((event) => {
    setIsOpen(true)
    setOptActive(undefined)
    handleChange('', event)
  }, [handleChange])

  const handleKeyDown = useCallback((event) => {
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
  }, [isOpen, optActive, optionsMap, handleSelect])

  const handleCreate = useCallback((event) => {
    if (onCreate!=undefined) {
      onCreate(shownText, event)
    }
    setCreating(false)
  }, [shownText, onCreate])  


  return (

      <div className="formiga-reactstrap-select-search"
            ref = {wrapperRef}>
        <div>
          <FInputAddon {...props}
                 valid   = {input.valid}
                 invalid = {! input.valid}
                 feedback= {isOpen ? undefined : feedback || input.feedback}
                 keepHeight  = {isOpen ? false : keepHeight}
                 >
            {/* Hidden input */}
            <FISSHidden {...props}
                        inputRef = {input.ref}/>
            {/* filter input */}
            <FISSInput {...props}
                      valid = {input.valid}
                      filterRef = {filterRef}
                      shownText = {shownText}
                      onSearchStart = {handleSearchStart}
                      onSearchType = {handleSearchType}
                      onKeyDown = {handleKeyDown}
                      />
            {/* Add or clear icon */}
            <FISSAction {...props}
                        creating= {creating}
                        onCreate= {handleCreate}
                        onClear = {handleClear}/>               
          </FInputAddon>
        </div>
        
          {isOpen
          ? <FISSList {...props}
                      listRef = {listRef}
                      optionsMap = {optionsMap}
                      onSelect = {handleSelect}
                      optActive = {optActive}/>
          : null
          }
      
      </div>
  )
}

const FInputSelectSearch = withWrapControlled(_FInputSelectSearch)

FInputSelectSearch.propTypes = {
  ...inputPropTypes,

  placeholder  : PropTypes.string,
  options     : PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.array)]),
  autocomplete : PropTypes.oneOf(["on", "off"]),
  clearable    : PropTypes.bool,
  creatable    : PropTypes.bool,
  onCreate     : PropTypes.func,
  maxShownOptions: PropTypes.number

}


FInputSelectSearch.defaultProps = {
  ...inputDefaultProps,
  icon: 'search',
  maxShownOptions: 10
}

export default FInputSelectSearch