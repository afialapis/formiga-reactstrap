import React from 'react'
import {BaseHeader} from './BaseHeader'
import {BaseMenu} from './BaseMenu'
import {BaseFooter}from './BaseFooter'

import '../../assets/scss/index.scss'

const Base = ({logoSrc, menuTitle, menuItems,  children}) => {

  return (  
    <div className="formiga-container">

      <BaseHeader logoSrc={logoSrc}/>

      <BaseMenu title={menuTitle}
                items={menuItems}/>
      <main>

        <div className="formiga-content">
          {children}
        </div>

      </main>

      <BaseFooter/>
    </div>
  )
}

export {Base}