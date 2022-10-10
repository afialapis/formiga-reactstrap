const React = require('react')
const expect= global.expect
const mount= global.mount

describe('Forms', function () {
  this.timeout(1000)

  it("should render an empty Form", () => {   
    const {VForm} = global.formigaRPkg

    const fid= 'formiga_reactstrap_empty_form'
    const App = () => {
      return (
        <div>
          <VForm id={fid}/>
        </div>
      )
    }

    const wrapper= mount(<App/>)
    const theForm= wrapper.find(`form#${fid}`)
    const theFormNode= theForm.getDOMNode()

    expect(theForm.length).to.equal(1)
    expect(theFormNode.classList.contains('formiga-reactstrap-form')).to.equal(true)

    wrapper.unmount()
  })  
})