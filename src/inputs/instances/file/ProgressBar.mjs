import React from 'react'

const ProgressBar = ({progress, ftypeIcon, bsSize}) => {
  const prg = progress!=undefined ? progress : 0
  const col = (progress == 100 ? '#00e64d' : '#ffcc00')

  return (
    <div className="bars formiga-reactstrap-progress"
         style={{position: "relative",
                  width     : ftypeIcon==undefined 
                                ? "100%"
                                : bsSize == 'sm'
                                ? "calc(100% - 75px)"
                                : bsSize == 'lg'
                                ? "calc(100% - 92px)"
                                : "calc(100% - 83px)", 
                  left      : ftypeIcon!=undefined 
                              ? bsSize == 'sm'
                                ? "35px"
                                : bsSize == 'lg'
                                ? "51px"
                                : "42px"
                              : "",
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

export default ProgressBar
