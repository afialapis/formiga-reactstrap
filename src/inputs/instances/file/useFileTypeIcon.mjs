import {useState, useEffect} from 'react'

const _getIcon = (mtype, icon, iconMap) => {
  if (icon==undefined || icon===false) {
    return undefined
  }
  if (iconMap) {
    const i1= iconMap[mtype]
    if (i1) { return i1}
  }
  if (icon) {
    return icon
  }
  return 'file'
}

const useFileTypeIcon = (mtype, icon, iconMap) => {
  const [theIcon, setTheIcon]= useState(_getIcon(mtype, icon, iconMap))

  useEffect(() => {
    setTheIcon(_getIcon(mtype, icon, iconMap))
  }, [mtype, icon, iconMap])

  return theIcon
}

export default useFileTypeIcon
