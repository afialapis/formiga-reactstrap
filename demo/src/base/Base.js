import React from 'react'
import {BaseHeader} from './BaseHeader'
import {BaseMenu} from './BaseMenu'
import {BaseSidebar} from './BaseSidebar'
import {BaseFooter}from './BaseFooter'

import '../../assets/scss/index.scss'

const Base = ({logoSrc, menuTitle, menuItems, options, onChangeOption, resume, children}) => {

  return (  
    <div className="formiga-container">

      <BaseHeader logoSrc={logoSrc}/>

      <BaseMenu title={menuTitle}
                items={menuItems}/>
      <main>

        <div className="formiga-example">
          {children}
        </div>

      </main>
      <BaseSidebar options= {options}
                   onChangeOption= {onChangeOption}
                   resume= {resume}/>
      <BaseFooter/>
    </div>
  )
}

export {Base}