import * as types from './mutation-types'
import {setItem} from '@/assets/js/session'


export const saveDocumentTitle = function ({commit, state}, title) {
  commit(types.SET_DOCUMENT_TITLE, title, setItem('documentTitle', title))
}

export const saveFilePathUrl = function ({commit}, filePathUrl) {
  commit(types.SET_FILE_PATH_URL, filePathUrl)
  setItem('filePathUrl', filePathUrl)
}


export const patrolOver = function ({commit,state},data) {
  commit(types.PATROL_OVER,data);
}