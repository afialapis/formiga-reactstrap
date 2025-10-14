import React from 'react'



const DemoSummary = ({ form }) => {

  if (form.elements.length==9) {
    return null
  }

  const changedNames = form.elements.filter(e => e.hasChanged).map(e => e.name)
  
  return (
    <>
      <h2>Resume</h2>

      <div className="log">
        <div className="log_main">
          {`Form is `}<span style={{color: form.valid ? 'green' : 'red'}}>{form.valid ? 'valid' : 'invalid'}</span>.
          {form.hasChanged ? <span style={{color: 'blue'}}>Has changed: {changedNames.join(', ')}.</span> : null}
        </div>
        {  form.elements.map((el) => {
          let value = ''
          try {
            if ((typeof el.value == 'object') && (el.value?.name)) {
              value = el.value.name
            } else {
              value = el.value.toString()
            }
          } catch(_err) { }
              
          return (
            <div className="log_field" key={el.name}>
              <div className="log_field_name"
                   style={{marginTop: '1em', fontWeight: 'bold'}}>{el.name}</div>
              <div className="log_field_value"
                   style={{fontStyle: 'italic', ...el.hasChanged ? {color: 'blue'} : {}}}>{value}</div>
              <div className="log_field_valid"
                   style={{color: el.valid ? 'green' : 'red'}}>{el.valid ? 'valid!' : `invalid (${el.validationMessage})`}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}


export default DemoSummary
