import * as type from '@/store/mutation-types'

const mutations = {
  [type.SET_DOCUMENTTITLE](state, documentTitle) {
    state.documentTitle = documentTitle
  },
  [type.SET_RESERVOIRDETAILINFO](state, reservoirDetailInfo) {
    state.reservoirDetailInfo = reservoirDetailInfo
  }
}

export default mutations