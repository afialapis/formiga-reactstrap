import React from 'react'

const BaseHeader = ({logoSrc}) =>
  <header>
    <div className="formiga-header-logo">
      <img className="logo" src={logoSrc}></img>
    </div>
    <div className="formiga-header-title">
      <h1 >
        formiga-reactstrap <i>demo</i>
      </h1>
    </div>
  </header>

export {BaseHeader}