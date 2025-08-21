import React, {useState, useEffect, useCallback} from 'react'
import useInputWrap from '../../helpers/useInputWrap.mjs'
import {FInputAddon}          from '../../addon/FInputAddon.mjs'
import ProgressBar from './ProgressBar'
import withWrapControlled from '../../helpers/props/withWrapControlled.mjs'
import useFileTypeIcon from './useFileTypeIcon.mjs'
import FFHidden from './FFHidden.mjs'
import FFInput from './FFInput.mjs'
import FFClear from './FFClear.mjs'



const FInputFileBase = (props) => {
  const {icon= 'file', onDownload, iconMap, value= undefined, setValue} = props
  
  const input = useInputWrap(props, {
    // <file> cannot be mounted with an assigned value, so
    //   original value will always be empty
    originalValue: undefined // props?.value?.name != undefined ? props?.value?.name : undefined
  })  
  const [hasValue  , setHasValue ]= useState(value?.buffer || value?.size>0)
  const [progress  , setProgress ]= useState(undefined)
  const [status    , setStatus   ]= useState(undefined)
  const [statusMsg , setStatusMsg]= useState(undefined)

  const ftypeIcon = useFileTypeIcon(value?.type, icon, iconMap)

  useEffect(() => {
    if (value) {
      if (value.buffer==undefined || value.buffer.length==0) {
        if (value.size>0) {
          input.setValidationMessage('')
        }
      }
    }
  }, [value, input])

  

  const handleChange = useCallback((event) => {
    event.persist()

    

    try {
      const reader = new FileReader()

      reader.onerror = (e) => {
        let st_msg=''
        
        switch (e.target.error.code) {
          case e.target.error.NOT_FOUND_ERR:
            st_msg= 'File not found!'
            break;
          case e.target.error.NOT_READABLE_ERR:
            st_msg = 'Unreadable file'
            break;
          case e.target.error.ABORT_ERR:
            break; // noop
          default:
            st_msg = 'Error reading file'
        }
        setStatusMsg(st_msg)
        setStatus('error')
        setValue({}, true, event)
        setHasValue(false)
      };

      reader.onabort = (_e) => {
        setStatus('abort')
        setStatusMsg('Aborted')
        setProgress(undefined)
        setValue({}, true, event)
        setHasValue(false)
      }

      reader.onprogress = (e) => {
        // e is an ProgressEvent.
        if (e.lengthComputable) {
          setProgress( Math.round((e.loaded / e.total) * 100))
        }        
      }

      reader.onloadstart = (_e) => {
        setProgress(0)
        setStatus('uploading')
        setStatusMsg('Loading file')
      }

      reader.onload = (e) => {
        const file= event.target.files[0]
        setProgress(100)
        setStatusMsg('File loaded')

        const nValue= {
          name   : file.name,
          size   : file.size,
          type   : file.type,
          buffer : new Uint8Array(e.target.result)
        }
        setValue(nValue, true, e)
        setHasValue(true)

        //input.setValue(file)
        input.validate()
      }
      
      reader.readAsArrayBuffer(event.target.files[0])
    } catch(e) {
      console.error(e)
      setStatus(undefined)
      setStatusMsg(undefined)
      setHasValue(false)
    }
  }, [setValue, input])

  const handleClear = useCallback((event) => {
    setProgress(0)
    setStatus(undefined)
    setStatusMsg(undefined)
    setValue({}, true, event)
    setHasValue(false)

    input.validate()
  }, [setValue, input]) 
  
  const handleBrowse = useCallback(() => {
    //let evt = document.createEvent("MouseEvents")
    //evt.initEvent("click", true, false)     
    //input.node.dispatchEvent(evt)
    //input.dispatchEvent('click', {cancelable: false})
    input.node.click()
  }, [input])

  const handleDownload = useCallback((ev) => {
    if (onDownload != undefined) {
      onDownload(value, ev)
    }
  }, [value, onDownload])
  
  // console.log(`status ${status} - vname ${value?.name} - files ${input?.node?.files.length} · ${ input?.node?.files[0]?.name}`)

  return (
    <FInputAddon {...props}
    input   = {input}
                 icon    = {ftypeIcon}
                 middleElement  = {status!=undefined
                                   ? <ProgressBar progress={progress}
                                                  ftypeIcon= {ftypeIcon}
                                                  bsSize = {props.bsSize}/>
                                   : null}
                 >

      {/* Hidden file input*/}
      <FFHidden {...props}
               onChange    = {handleChange}
               hasValue = {hasValue}
               input = {input}/>
      
      {/* The real Input */}
      <FFInput {...props}
               statusMsg = {statusMsg}
               hasValue = {hasValue}
               value = {value}
               input = {input}
               onDownload = {handleDownload}
               onBrowse = {handleBrowse}
               ftypeIcon = {ftypeIcon}
               />
      
      {/* Clear icon */}
      <FFClear hasValue = {hasValue}
               onClear = {handleClear}/>
              
    </FInputAddon>    
  )
}


const FInputFile = withWrapControlled(FInputFileBase)


export default FInputFile