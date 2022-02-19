import React from 'react'
import ReactDOM from 'react-dom'
import co from "co"
import ES6Promise from 'es6-promise'
//import assert from 'assert'
import VForm from '../src/VForm'

ES6Promise.polyfill()

describe('Formiga Reactstrap', function() {

  this.timeout(30000)
  let container;

  before(function(){
    container = document.createElement("div")
    container.id = "react"  
    document.body.appendChild(container)
  })
  
  after(function(){
    document.body.removeChild(container)
  }) 
  
  it("should render an empty form.", co.wrap(function *(){
    const App = () => {
      return (
        <div>
          <VForm/>
        </div>
      )
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    //const emptyFormElement = document.getElementById(id)
    //assert.notEqual(emptyFormElement.getAttribute('class').indexOf('formiga-form'), -1)
    // ReactDOM.unmountComponentAtNode(container)
  }))  

})
