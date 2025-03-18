import React from 'react'

export const DemoSummary = ({ resume}) => {

  console.log(`[demo-summary] Render`)  
  return (
    <aside>
  
      {resume.length>0
      ?  <>
            <h2>Resume</h2>

            <div className="log">
              {resume.map((s, i) => 
                <div key={`log_line_${i}`}
                    className="log_line" style={{...s.style || {}}}>{s.msg}</div>
              )}
            </div>
          </>
      : null}
    </aside>
  )
}
