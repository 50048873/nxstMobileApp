// css验证用是否有效类名
export const VALID = 'VALID'

/*
 * 接口相关
*/

// 成功
export const success = 1

// 出错
export const error = 0

/*
 * localStorage缓存
*/

// 登录
export const loginInfo = 'loginInfo'

// 高亮类名
export const ON = 'ON'

// 水库详情文档标题
export const documentTitle_reservoirDetail = 'documentTitle_reservoirDetail'

// 文档默认标题
export const defaultDocumentTitle = '宁夏水投智慧水务平台'

// 真实接口
export const baseUrl = 'http://sw.dse.cn:56015'

// 调试接口
//export const baseUrl = window.location.origin

// 路径
export const path = '/znb/pages/app/app/reservoir'

// 无数据默认值
export const defaultTextByNoData = '--'

//菜单及操作权限配置
export const resourceList = {
    check:"402881d162b4ae1c0162bce2d46901de",//    监测
    tour:"402881d162b4ae1c0162d15a77b705cd",//    巡视
    member:"402881d162b4ae1c0162d2a0e76007b1",//    人员
    overall:"402881d162b4ae1c0162d1af12d40672",//    全景
    vadio:"402881d162b4ae1c0162d1af807a0675",//    视频菜单
    waterlevel:"402881d162b4ae1c0162d1afb9e40676",//    水位菜单
    wateryield:"402881d162b4ae1c0162d1afef850677",//    雨量菜单
    qualitymonitor:"402881d162b4ae1c0162d1b03e0c0678",//    水质监测菜单
    provideyield:"402881d162b4ae1c0162d1b080820679",//    供水量菜单
    photo:"402881d162b4ae1c0162d1b0b78a067b",//    图像菜单
    seep:"402881d162b4ae1c0162d1b10351067c",//    渗流菜单
    artificialpost:"402881d162b4ae1c0162d1b14c57067d",//    人工填报菜单
    warning:"402881d162b4ae1c0162d1b1b19f067e",//     预警
    postartificialpost:"402881d162d65a7c0162d679d5480044",//人工填报信息提交 
    addcheckrecord:"402881d162d65a7c0162f554c0f9067b"//添加巡查记录

}