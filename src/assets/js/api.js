import $ from 'jquery'

let login = function(data) {
	return $.ajax({
		type: 'POST',
		url: '/api/login',
		data: data
	})
}

let getNewsMarquee = function() {
  return $.ajax({
    type: 'GET',
    url: '/api/newsMarquee'
  })
}

let getReservoirList = function() {
  return $.ajax({
    type: 'GET',
    url: '/api/reservoirList'
  })
}

let getReservoirDetailInfo = function(data) {
  return $.ajax({
    type: 'GET',
    url: '/api/reservoirDetail/info',
    data: data
  })
}

let getReservoirDetailMember = function() {
  return $.ajax({
    type: 'GET',
    url: '/api/reservoirDetail/member'
  })
}

let getReservoirDetailInspection = function() {
  return $.ajax({
    type: 'GET',
    url: '/api/reservoirDetail/inspection'
  })
}

export default {
	login: login,
  getNewsMarquee: getNewsMarquee,
  getReservoirList: getReservoirList,
  getReservoirDetailInfo: getReservoirDetailInfo,
  getReservoirDetailMember: getReservoirDetailMember,
  getReservoirDetailInspection: getReservoirDetailInspection
}
