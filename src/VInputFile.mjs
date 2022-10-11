import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {VInputAddon} from './addon/VInputAddon.mjs'
import VIcon from './icons/VIcon.mjs'
import {InputGroupText}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes.mjs'
import {inputDefaultProps} from './props/inputDefaultProps.mjs'
import {useInnerValue} from './value/useInnerValue.mjs'
import {withFormiga} from './formiga/withFormiga.mjs'
import { useValidClassnames } from './helpers/useValidClassnames.mjs'


const ProgressBar = ({progress}) => {
  const prg = progress!=undefined ? progress : 0
  const col = (progress == 100 ? '#00e64d' : '#ffcc00')

  return (
    <div className="bars formiga-reactstrap-progress"
         style={{position: "relative",
                 width: "calc(100% - 83px)",
                 left: "42px",
                 top: "-3px",
                 zIndex: "5"}}>
      <div className="progress-xs  mb-0 progress" style={{height: "0.25em", backgroundColor: "transparent"}}>
        <div className={"progress-bar bg-"+col}
              style={{ width: prg+"%", backgroundColor: col }}
              role="progressbar"
              aria-valuenow={prg.toString()}
              aria-valuemin="0"
              aria-valuemax="100">
        </div>
      </div>
    </div>
  )
}

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const getIcon = (mtype, icon, iconMap) => {
  if (icon==undefined || icon===false) {
    return icon
  }
  if (iconMap) {
    const i1= iconMap[mtype]
    if (i1) { return i1}
  }
  if (icon) {
    return icon
  }
  return 'file'
}

const _VInputFile = (props) => {
  const {id, name, label, description, icon, inline, readOnly, 
         required, feedback, keepHeight, formGroupStyle, inputGroupStyle, 
         inputStyle, onChange, onDownload, accept, iconMap,
         setValidity, valid, message, inputRef, showValidity, bsSize} = props
  
  const [progress  , setProgress ]= useState(undefined)
  const [status    , setStatus   ]= useState(undefined)
  const [statusMsg , setStatusMsg]= useState(undefined)

  const [_initialValue, innerValue, setInnerValue] = useInnerValue(props)
  
  useEffect(() => {
    if (innerValue) {
      if (innerValue.buffer==undefined || innerValue.buffer.length==0) {
        if (innerValue.size>0) {
          inputRef.current.setCustomValidity(true)
          inputRef.current.removeAttribute('data-formiga-validity')
        }
      }
    }
  })

  const [className]= useValidClassnames(valid, showValidity, () => hasValue() || !required)

  const handleChange = useCallback((ev) => {
    ev.persist()

    const file= ev.target.files[0]

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
      };

      reader.onabort = (_e) => {
        setStatus('abort')
        setStatusMsg('Aborted')
        setProgress(undefined)
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
        setProgress(100)
        setStatusMsg('File loaded')

        const nfile= {
          name   : file.name,
          size   : file.size,
          type   : file.type,
          buffer : new Uint8Array(e.target.result)
        }
        setInnerValue(nfile)
        if (onChange!=undefined) {
          onChange(nfile, true, e)
        }
      }
      
      reader.readAsArrayBuffer(ev.target.files[0])
    } catch(e) {
      console.error(e)
      setStatus(undefined)
      setStatusMsg(undefined)
    }
  }, [setInnerValue, onChange])

  const handleClear = useCallback((event) => {
    setProgress(0)
    setStatus(undefined)
    setStatusMsg(undefined)
    setInnerValue({})
    if (onChange!=undefined) {
      onChange({}, true, event)
    }
    inputRef.current.value= ''
    setValidity()    
  }, [inputRef, setInnerValue, onChange, setValidity]) 
  
  const handleBrowse = useCallback(() => {
    let evt = document.createEvent("MouseEvents")
    evt.initEvent("click", true, false)
    inputRef.current.dispatchEvent(evt)    
  }, [inputRef])

  const handleDownload = useCallback((ev) => {
    if (onDownload != undefined) {
      onDownload(innerValue, ev)
    }
  }, [innerValue, onDownload])

  const hasValue = () => {
    return innerValue?.buffer || innerValue?.size>0
  }

  const theIcon= getIcon(innerValue?.type, icon, iconMap)
 
  return (
    <VInputAddon name          = {name}
                label          = {label}
                description    = {description}
                feedback       = {feedback||message}
                value          = {innerValue}
                icon           = {theIcon}
                showValidity   = {showValidity}
                isValid        = {valid}
                inline         = {inline}
                keepHeight     = {keepHeight}
                formGroupStyle = {formGroupStyle}
                inputGroupStyle= {inputGroupStyle}
                middleElement  = {status!=undefined
                                  ? <ProgressBar progress={progress}/>
                                  : null}
                bsSize         = {bsSize}
                >
      {/* Hidden file input*/}
      <input  style       = {{zIndex: "0", display: "inline", opacity: "0", visibility: "hidden"}}
              id          = {id}
              name        = {name}
              // Do not lose the form-control class
              // TODO maybe open PR on reactstrap?
              className   = {`form-control ${bsSize!=undefined ? 'form-control-'+bsSize : ''}`}
              ref         = {inputRef}
              type        = {"file"}
              value       = {undefined}
              onChange    = {(e) => handleChange(e)}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              // If we receive some value on initing,
              // we have no way to assign it to this input (file are readonly)
              // So we hack this.
              // TODO Would be better to use maybe another type of hidden input,
              // keeping the <file> just for the file upload.
              required    = {required && !hasValue()}
              //valid       = {valid ? 'true' : 'false'}
              //invalid     = {!valid ? 'true' : 'false'}
              accept      = {accept}
      />
      <div  style       = {{opacity   : "1", 
                            zIndex    : "3", 
                            position  : "absolute", 
                            width     : theIcon==undefined 
                                          ? "100%"
                                          : (showValidity==1 || showValidity==4)
                                            ? valid 
                                              ? "calc(100% - 83px)" 
                                              : "calc(100% - 83px)"
                                            : "calc(100% - 83px)", 
                            left      : theIcon!=undefined ? "42px" : "", 
                            display   : "flex",
                            cursor    : 'pointer',
                            userSelect: 'none',
                            ...inputStyle
                          }}
            className   = {`form-control ${className} ${bsSize!=undefined ? 'form-control-'+bsSize : ''}`}
            onClick     ={hasValue() 
                          ? (ev) => handleDownload(ev) 
                          : (_)  => handleBrowse()}>
            {hasValue()
              ? <div style={{display: "flex", width: "100%", alignItems: "stretch"}}>
                  <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {`${onDownload != undefined ? '⤓ ' : ''}${innerValue.name}`}
                  </div>
                  <div style={{flex: "1 1 auto", textAlign: "right"}}>
                    <i style={{fontSize: "0.6em", opacity: "0.75", whiteSpace: "nowrap"}}>
                      {` (${formatBytes(innerValue.size)})`}
                    </i>
                  </div>
                </div>
              : inputRef.current && inputRef.current.files.length
                ? inputRef.current.files[0].name
                : statusMsg!=undefined
                  ? statusMsg
                  : '...'
            }
      </div>
      <InputGroupText 
                onClick   = {hasValue() 
                              ? (ev) => handleClear(ev) 
                              : () => {}
                              }
                style     = {{cursor: hasValue() ? 'pointer' : 'not-allowed', zIndex: "2",
                              opacity:hasValue() ? 1 : 0.5}}>
        <VIcon icon="cross"/>
      </InputGroupText>

                  
    </VInputAddon>    
  )
}


const VInputFile= withFormiga(_VInputFile)


VInputFile.propTypes = {
  ...inputPropTypes,
  onDownload: PropTypes.func,
  accept: PropTypes.string,
  iconMap: PropTypes.object
}

VInputFile.defaultProps = {
  ...inputDefaultProps,
  icon : 'file',
  value: undefined
}

export default VInputFile