import * as type from '@/store/mutation-types'

const mutations = {
  [type.SET_RESERVOIRLIST](state, reservoirList) {
    state.reservoirList = reservoirList
  }
}

export default mutations