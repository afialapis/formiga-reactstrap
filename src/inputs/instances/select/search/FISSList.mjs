import React from 'react'

const FISSList = (props) => {
  const {name, maxShownOptions= 10,
         listRef, optionsMap, onSelect, optActive
         } = props

  const getListStyle= () => {
    // TODO
    // Check where this gap (13 / 6) comes from and try to make better
    /*if (filterRef.current) {  
      return {
        left: filterRef.current.parentNode.children[0].offsetWidth+13+'px',
        minWidth: filterRef.current.offsetWidth+'px',
        maxWidth: filterRef.current.offsetWidth+'px'
      }
    }*/
    return {}
  }

  return (

    <div className="formiga-reactstrap-select-search-list list-group shadow-lg"
          ref = {listRef}
          style={getListStyle()}>
      {optionsMap.map((opt, idx) =>  {
        if (idx<=(maxShownOptions-1)) {
          return (
            <div key     = {`${name}_option_${opt.value}`}
                  value   = {opt.value}
                  className={`formiga-reactstrap-select-search-list-item list-group-item list-group-item-action ${opt.disabled ? 'disabled' : ''} ${optActive==idx ? 'active': ''}`}
                  onClick = {(ev) => !opt.disabled && onSelect(opt.value, ev)}
                  >
              {opt.label || <>&nbsp;</>}
            </div>)
        }
      }
      )}
      {optionsMap.length>maxShownOptions
        ? <div key     = {`${name}_option_ellipsis`}
              className={`formiga-reactstrap-select-search-list-item list-group-item list-group-item-action disabled ellipsis`}>
          ...
          </div>
        : null}
    </div>
  )
}


export default FISSList