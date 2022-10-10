const isControlled = (props) => {
  return (Object.keys(props).indexOf('defaultValue')<0) 
}

export default isControlled