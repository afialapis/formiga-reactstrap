const makeId = (obj) => {
  return JSON.stringify(obj).substr(0,50)
}

export {makeId}