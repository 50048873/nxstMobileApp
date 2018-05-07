import * as type from '@/store/mutation-types'

const mutations = {
  [type.SET_RESERVOIRLIST](state, reservoirList) {
    state.reservoirList = reservoirList
  },
  [type.SET_WARNCONFIG](state, warnConfig) {
    state.warnConfig = warnConfig
  },
  [type.SET_DOCUMENT_TITLE](state, documentTitle) {
    state.documentTitle = documentTitle
  },
  [type.SET_FILE_PATH_URL](state, filePathUrl) {
    state.filePathUrl = filePathUrl
  },
  [type.PATROL_OVER](state,data){
    state.patrolover = {
      usetime:data.usetime,
      starttime:data.starttime,
      endtime:data.endtime
    }
  }
}

export default mutations