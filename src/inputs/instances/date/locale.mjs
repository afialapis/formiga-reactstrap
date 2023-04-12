export const DATES_LOCALES= {
  'en': {
    dayLabels   : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthLabels : ['January', 'February', 'March', 'April',
                   'May', 'June', 'July', 'August', 'September',
                   'October', 'November', 'December'],
    weekStartsOn: 0,
    dateFormat  : "MM/DD/YYYY"
  },
  'es': {
    dayLabels   : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    monthLabels : ['Enero', 'Febrero', 'Marzo', 'Abril',
                  'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                  'Octubre', 'Noviembre', 'Diciembre'],
    weekStartsOn: 1,
    dateFormat  : "DD/MM/YYYY"   
  }
}

export function getDefaultLocale() {
  try {
    function _parse_lang(l) {
      if (!l) return 'en'
      const parts= l.split('-')
      const locale= parts[0]
      if (locale in DATES_LOCALES) {
        return locale
      }
      return 'en'
    }
    

    if (navigator.languages != undefined) 
      return _parse_lang(navigator.languages[0])
    return _parse_lang(navigator.language)
  } catch(_) {
    return 'en'
  }
}

