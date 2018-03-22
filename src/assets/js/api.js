import $ from 'jquery'
import {baseUrl} from '@/assets/js/config'

let login = function(data) {
	return $.ajax({
		type: 'POST',
		url: baseUrl + '/api/login',
		data: data
	})
}

let getNewsMarquee = function() {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/api/newsMarquee'
  })
}

let getReservoirList = function() {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/api/reservoirList',
    //url: baseUrl + '/znb/reservoirSurveyController/getReservoirBasicInfo.do'
  })
}

let getReservoirDetailInfo = function(data) {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/api/reservoirDetail/info',
    data: data
  })
}

let getReservoirDetailMember = function() {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/api/reservoirDetail/member'
  })
}

let getReservoirDetailInspection = function() {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/api/reservoirDetail/inspection'
  })
}

let getReservoirDetailMonitorPhoto = function() {
  return $.ajax({
    type: 'GET',
    url: baseUrl + '/api/reservoirDetail/monitor/photo'
  })
}

export default {
	login: login,
  getNewsMarquee: getNewsMarquee,
  getReservoirList: getReservoirList,
  getReservoirDetailInfo: getReservoirDetailInfo,
  getReservoirDetailMember: getReservoirDetailMember,
  getReservoirDetailInspection: getReservoirDetailInspection,
  getReservoirDetailMonitorPhoto: getReservoirDetailMonitorPhoto
}
