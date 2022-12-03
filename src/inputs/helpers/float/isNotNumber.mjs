const isNotNumber = (n) => 
  (n==='') || (n===undefined) || (n===null) || isNaN(n)

export default isNotNumber
