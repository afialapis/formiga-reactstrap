import React from 'react'

const FInputFeedback = ({valid, feedback, keepHeight}) => {
  const show= keepHeight || (! valid && feedback)
  if (! show)
    return null;

  return (
    <div className={`formiga-reactstrap-feedback ${valid ? 'hidden' : ''}`}>
      {feedback!=undefined && feedback!=""
       ? feedback
       : <>&nbsp;</>
      }
    </div>
  )
}

export default FInputFeedback
