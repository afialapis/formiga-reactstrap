import React from 'react'
import { useValidClassnames } from '../../helpers/useValidClassnames.mjs'
import formatBytes from './formatBytes'

const FFInput = (props) => {
  const {
    required, inputStyle, 
    showValidity= 4, bsSize,
    statusMsg, hasValue, value, valid, ftypeIcon,
    onDownload, onBrowse} = props

  const [className]= useValidClassnames(valid, showValidity, () => hasValue || !required)

  return (

    <div  style       = {{opacity   : "1", 
                          zIndex    : "3", 
                          position  : "absolute", 
                          width     : ftypeIcon==undefined 
                                        ? "100%"
                                        : bsSize == 'sm'
                                        ? "calc(100% - 74px)"
                                        : bsSize == 'lg'
                                        ? "calc(100% - 91px)"
                                        : "calc(100% - 82px)", 
                          left      : ftypeIcon!=undefined 
                                      ? bsSize == 'sm'
                                        ? "35px"
                                        : bsSize == 'lg'
                                        ? "51px"
                                        : "42px"
                                      : "", 
                          display   : "flex",
                          cursor    : 'pointer',
                          userSelect: 'none',
                          ...inputStyle
                        }}
          className   = {`form-control ${className} ${bsSize!=undefined ? 'form-control-'+bsSize : ''}`}
          onClick     ={hasValue 
                        ? (ev) => onDownload(ev) 
                        : (_)  => onBrowse()}>
          {hasValue
            ? <div style={{display: "flex", width: "100%", alignItems: "stretch"}}>
                <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                  {`${onDownload != undefined ? '⤓ ' : ''}${value.name}`}
                </div>
                <div style={{flex: "1 1 auto", textAlign: "right"}}>
                  <i style={{fontSize: "0.6em", opacity: "0.75", whiteSpace: "nowrap"}}>
                    {` (${formatBytes(value.size)})`}
                  </i>
                </div>
              </div>
            : statusMsg!=undefined
            ? statusMsg
            : '...'
          }
    </div>

  )
}


export default FFInput
