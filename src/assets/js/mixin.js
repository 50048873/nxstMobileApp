import _dateFormat from 'dateformat'
import {isArray} from '@/assets/js/util'

export let dateFormat = {
	methods: {
		dateFormat(time, formatter) {
      formatter = formatter ? formatter : 'mm-dd HH:MM'
      return _dateFormat(time, formatter)
    }
	},
	filters: {
		dateFormat(time, formatter) {
      formatter = formatter ? formatter : 'mm-dd HH:MM'
			if (typeof time === 'string' && time.indexOf('T')) {
				time = time.split('T').join(' ')
			}
      return _dateFormat(time, formatter)
    }
	}
};

export let gcgmFilter = {
  methods: {
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
  },
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
};

export let getDataByKey = {
  methods: {
    getDataByKey(data, key) { // data: Array; key: String
      let arr = []
      if (isArray(data) && data.length) {
        data.forEach((item) => {
          arr.push(item[key])
        })
        return arr
      }
      return data
    }
  }
}