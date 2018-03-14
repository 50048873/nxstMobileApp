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