import moment from 'moment'
import {isArray, isString} from '@/assets/js/util'
import {path} from '@/assets/js/config'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
moment.locale('zh-cn');
export let dateFormat = {
	methods: {
		dateFormat(time, formatter) {
      formatter = formatter ? formatter : 'MM-DD hh:mm'
      if (typeof time === 'string' && time.indexOf('-')) {
        time = time.split('-').join('/')
      }
      return moment(time).format(formatter)


    }
	},
	filters: {
		dateFormat(time, formatter) {
      formatter = formatter ? formatter : 'MM-DD hh:mm'
			if (typeof time === 'string' && time.indexOf('-')) {
				time = time.split('-').join('/')
			}
      console.log(moment(time).format(formatter))
      return moment(time).format(formatter)

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
          let val = item[key]
          if (key === 'value') {
            val = parseFloat(val)
          }
          arr.push(val)
        })
        return arr
      }
      return data
    }
  }
};

export let getBottomPosition = {
  methods: {
    getBottomPosition(bottom) { 
      let footer = 62
      bottom = parseInt(bottom)
      return footer + bottom
    }
  }
};

export let getStaticPath = {
  methods: {
    getStaticPath(imgUrl) { 
      return path + imgUrl
    }
  }
};

export let monitorAdd = {
  methods: {
    monitorAdd() {
      this.$router.push('/reservoirDetail/monitor/add')
    }
  }
};

export let getWarnConfig = {
  methods: {
    getWarnConfig({pid}) {
      api.getWarnConfig({pid})
        .then((res) => {
          if (res.status === success) {
            this.SET_WARNCONFIG(res.data)
            // console.log(JSON.stringify(res.data, null , 2))
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirOverview.vue')
        })
    }
  }
};

export let convertPath = {
  methods: {
    convertPath(url, searchCharacter, replaceCharacter) {
      if (isString(url) && url.indexOf(searchCharacter) > -1) {
        return url.replace(searchCharacter, replaceCharacter)
      }
      return url
    }
  }
};