import $ from 'jquery'
import {baseUrl} from '@/assets/js/config'

const serverUrl = 'http://sw.dse.cn:56016'

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
  // data.forEach((item, key) => {
  //   console.log(key, ': ', item)
  // })
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

// 监测 -> 水位
let getReservoirDetailMonitor_waterlevel = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/wrSwRController/getAllData.do') : (baseUrl +  '/api/reservoirDetail/monitor/waterlevel')
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}

// 监测 -> 雨量
let getReservoirDetailMonitor_rainfall = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/stPptnRController/getAllData.do') : (baseUrl +  '/api/reservoirDetail/monitor/rainfall')
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}

// 监测 -> 图像
let getReservoirDetailMonitorPhoto = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/cmUploadFilesController/listAllFiles.do') : (baseUrl +  '/api/reservoirDetail/monitor/watersupply')
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}

// 监测 -> 水质
let getReservoirDetailMonitor_waterquality = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/tbWaterQualityController/getObjByPid.do') : (baseUrl +  '/api/reservoirDetail/monitor/waterquality')
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}

// 监测 -> 供水量
let getReservoirDetailMonitor_watersupply = function(data) {
  const url = baseUrl === serverUrl ? (baseUrl +  '/znb/tbWaterSupplyController/getAllData.do') : (baseUrl +  '/api/reservoirDetail/monitor/watersupply')
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}

// 监测 -> 人工填报
let getReservoirDetailMonitorAdd = function (data) {
  const url = baseUrl +  '/znb/manualFillController/saveOrUpdate.do'
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}

// getSessionUser
let getSessionUser = function () {
  const url = baseUrl +  '/znb/sysController/getSessionUser.do'
  return $.ajax({
    type: 'GET',
    url: url
  })
}

// listResourceNodeByUser
let getListResourceNodeByUser = function () {
  const url = baseUrl +  '/znb/resourceController/listResourceNodeByUser.do'
  return $.ajax({
    type: 'POST',
    url: url
  })
}

// 查询预警设置
let getWarnConfig = function(data) {
  const url = baseUrl +  '/znb/tbWarnConfigController/getObjByPid.do'
  return $.ajax({
    type: 'GET',
    url: url,
    data: data
  })
}

let getOrganizationList = ()=>{
  const url = baseUrl+'/znb/CommonCtrl/listOrganization.do'
  return $.ajax({
    type:'GET',
    url
  })
}

let getBranchList = (data)=>{
  const url = baseUrl+'/znb/CommonCtrl/getDepartmentByOrganization.do'
  return $.ajax({
    type:'POST',
    url,
    data
  })
}

let getMemberList =(data)=>{
  const url = baseUrl+'/znb/CommonCtrl/getUserByDepartment.do'
  return $.ajax({
    type:'POST',
    url,
    data
  })
}

// 根据字典code获取字典项值
let getDictValueByCode = function(code) {
  const url = 'http://sw.dse.cn:56012/znb/CommonCtrl/getDictValueByCode.do'
  return $.ajax({
    type: 'GET',
    url: url,
    data: code
  })
}

// 查询服务器信息
let getServerInfo = function (data) {
  const url = baseUrl +  '/znb/cmVideoServerController/getServerInfo.do'
  return $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    data: JSON.stringify(data)
  })
}


// 获取文件请求url地址
let getFilePathUrl = function() {
  const url = baseUrl + '/znb/CommonCtrl/getFilePathUrl.do'
  return $.ajax({
    type: 'GET',
    url: url
  })
}
//获取用户资源权限列表
let getUserAuthInfo = (data) =>{
  const url = baseUrl + '/znb/privilegeController/getResourceByIdAndUser.do'
  return $.ajax({
    type:"POST",
    data,
    url
  })
}

export default {
	login,
  getSessionUser,
  getListResourceNodeByUser,
  getNewsMarquee,
  getReservoirList,
  getReservoirDetailInfo,
  getReservoirDetailMember,
  getReservoirDetailInspection,
  getReservoirDetailInspectionAdd,
  getReservoirDetailInspectionAdd_patrolPoint,
  getReservoirDetailMonitor_waterlevel,
  getReservoirDetailMonitor_rainfall,
  getReservoirDetailMonitorPhoto,
  getReservoirDetailMonitor_waterquality,
  getReservoirDetailMonitor_watersupply,
  getReservoirDetailMonitorAdd,
  getWarnConfig,
  getOrganizationList,
  getBranchList,
  getMemberList,
  getDictValueByCode,
  getServerInfo,
  getFilePathUrl,
  getUserAuthInfo
}
