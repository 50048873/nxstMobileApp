import * as types from './mutation-types'
import {setItem} from '@/assets/js/session'


export const saveDocumentTitle = function ({commit, state}, title) {
  commit(types.SET_DOCUMENT_TITLE, title, setItem('documentTitle', title))
}