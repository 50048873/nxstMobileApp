import $ from 'jquery'
import {baseUrl} from '@/assets/js/config'

const serverUrl = 'http://58.48.169.26:56012'

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

// 水库概览 -> 列表
let getReservoirList = function() {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/reservoirSurveyController/getReservoirBasicInfo.do') : (baseUrl +  '/api/reservoirList')
  return $.ajax({
    type: 'GET',
    url: url
  })
}

// 信息
let getReservoirDetailInfo = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/tb0001Prnmsr044Controller/getBaseInfo.do') : (baseUrl +  '/api/reservoirDetail/info')
  return $.ajax({
    type: 'GET',
    url: url,
    data: data
  })
}

// 人员
let getReservoirDetailMember = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/personManageController/getPersonList.do') : (baseUrl +  '/api/reservoirDetail/member')
  return $.ajax({
    type: 'GET',
    url: url,
    data: data
  })
}

// 巡检
let getReservoirDetailInspection = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/patrolRecord/getRecordList.do') : (baseUrl +  '/api/reservoirDetail/inspection')
  return $.ajax({
    type: 'POST',
    url: url,
    data: data
  })
}

// 巡检 -> 上传
let getReservoirDetailInspectionAdd = function(data) {
  data.forEach((item, key) => {
    console.log(key, ': ', item)
  })
  return $.ajax({
    type: 'POST',
    contentType: false,
    processData: false,
    cache: false,
    url: baseUrl +  '/znb/patrolRecord/addRecord.do',
    data: data
  })
}

// 巡检 -> 上传 -> 获取巡检点/签到点
let getReservoirDetailInspectionAdd_patrolPoint = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/patrolPoint/getPatrolPointList2.do') : (baseUrl +  '/api/reservoirDetail/inspection/patrolPoint')
  return $.ajax({
    type: 'GET',
    url: url,
    data: data
  })
}

// 监测 -> 供水量
let getReservoirDetailMonitor_watersupply = function(data) {
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: baseUrl + '/znb/tbWaterSupplyController/getAllData.do',
    data: JSON.stringify(data)
  })
}

// 监测 -> 图像
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
  getReservoirDetailInspectionAdd: getReservoirDetailInspectionAdd,
  getReservoirDetailInspectionAdd_patrolPoint: getReservoirDetailInspectionAdd_patrolPoint,
  getReservoirDetailMonitor_watersupply: getReservoirDetailMonitor_watersupply,
  getReservoirDetailMonitorPhoto: getReservoirDetailMonitorPhoto
}
