import React from 'react'
import {createRoot} from 'react-dom/client'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './src/demo.scss'

import Demo from './src/Demo'

const container = document.getElementById('content')
const root = createRoot(container)
root.render(<Demo/>)