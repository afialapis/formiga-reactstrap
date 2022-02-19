import React, {useState} from 'react'
import {VInputFile} from '../../../src'

const DemoInputFile = (options) => {
  const [file, setFile]= useState({
    name: 'doc.docx',
    size: 10226,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    buffer: undefined
  })
  return (
      <VInputFile
             name        = {'id_card'}
             required    = {true}
             label       = {"Upload a copy of your ID Card, authorities must know you"}
             description = "We'll keep it safe"
             onDownload  = {(v) => console.log(v)}
             onChange    = {(f) => setFile(f)}
             value       = {file}
             {...options}/>   
  )
}

export {DemoInputFile}
