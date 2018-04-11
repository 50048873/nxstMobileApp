import * as type from '@/store/mutation-types'

const mutations = {
  [type.SET_RESERVOIRLIST](state, reservoirList) {
    state.reservoirList = reservoirList
  },
  [type.SET_WARNCONFIG](state, warnConfig) {
    state.warnConfig = warnConfig
  }
}

export default mutations