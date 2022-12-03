const roundFloat = (number, decimals) => {
  const factorOfTen = Math.pow(10, decimals)
  const rounded = Math.round(number * factorOfTen) / factorOfTen
  //console.log(`roundFloat ${number} ==> ${rounded}`)
  return rounded
}

export default roundFloat