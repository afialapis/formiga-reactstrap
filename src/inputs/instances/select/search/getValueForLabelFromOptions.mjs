const getValueForLabelFromOptions = (label, options) => {
  if (!label) {
    return ''
  }

  for (const opt of options) {
    if (opt.label.toLowerCase()==label.toLowerCase()) {
      return opt.value
    }
  }
  return ''
}


export {getValueForLabelFromOptions}