import _dateFormat from 'dateformat'

export let dateFormat = {
	methods: {
		dateFormat(time, formatter) {
      return _dateFormat(time, formatter)
    }
	},
	filters: {
		dateFormat(time, formatter) {
			if (typeof time === 'string' && time.indexOf('T')) {
				time = time.split('T').join(' ')
			}
      return _dateFormat(time, formatter)
    }
	}
}

export let gcgmFilter = {
  filters: {
    gcgmFilter(val) {
      if (!val) return
      let res = ''
      switch (val) {
        case 'Ⅰ':
          res = '大(１)型'
          break
        case 'Ⅱ':
          res = '大(２)型'
          break
        case 'Ⅲ':
          res = '中型'
          break
        case 'Ⅳ':
          res = '小(１)型'
          break
        case 'Ⅴ':
          res = '小(２)型'
          break
      }
      return res
    }
  }
}