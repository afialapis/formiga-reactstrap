const React = require('react')
const expect= global.expect
const render= global.render

describe('Forms', function () {
  //this.timeout(15000)

  it("should render an empty Form", () => {   
    this.timeout(15000)
    const {FForm} = global.formigaRPkg

    const fid= 'formiga_reactstrap_empty_form'
    const App = () => {
      return (
        <div>
          <FForm id={fid}/>
        </div>
      )
    }

    const {container}= render(<App/>)
    const theForm= container.querySelector(`#${fid}`)

    expect(theForm.classList.contains('formiga-reactstrap-form')).to.equal(true)
  })  
})