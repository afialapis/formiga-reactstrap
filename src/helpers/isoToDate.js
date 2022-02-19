const isoToDate = (value) => {
  if (value===undefined || value==='') {
    return value
  }
  
  const getDateFromEu = (s) => {
    const parts= s.split('/')
    const year= parseInt(parts[2])
    const month= parseInt(parts[1])-1
    const day= parseInt(parts[0])
    return [day, month, year]    
  }
  
  const getDateFromIso = (s) => {
    const parts= s.split('-')
    const year= parseInt(parts[0])
    const month= parseInt(parts[1])-1
    const day= parseInt(parts[2])
    return [day, month, year]      
  }


  // date
  let day, month, year
  if (value.indexOf('/')>=0) {
    [day, month, year] = getDateFromEu(value)
  } else {
    [day, month, year] = getDateFromIso(value)
  }
 
  // time
  let hour= 0, min= 0, secs= 0
  if (value.indexOf('T')>=0) {
    let parts= value.split('T')[1]
    parts= parts.split(':')
    hour= parseInt(parts[0])
    min= parseInt(parts[1])
    secs= parseInt(parts[2])
  }

  const date= new Date(Date.UTC(year, month, day, hour, min, secs))  

  return date
}

export {isoToDate}