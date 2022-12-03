import React, {useState} from 'react'
import {FInputTextArea} from '../../../src'

const DemoInputTextArea = (options) => {
  const [story, setStory]= useState('It started a warm Friday\'s night. I was bored...')

  return (
    <FInputTextArea 
          name        = {'story'}
          value       = {story}
          minLength   = {50}
          label       = {"Tell us more about your love story with Formiga"}
          description = {`Not required. Min length 50 (currently ${story.length}).`}
          onChange    = {(v) => setStory(v)}
          {...options} />
  )
}

export {DemoInputTextArea}