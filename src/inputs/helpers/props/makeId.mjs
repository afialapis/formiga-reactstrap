const makeId = (obj) => {
  if (!obj) {
    return ''
  }
  return JSON.stringify(obj).substr(0,50)
}

export {makeId}