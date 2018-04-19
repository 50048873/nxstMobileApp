import * as types from './mutation-types'
import {storeDocumentTitle} from '@/assets/js/cache'


export const saveDocumentTitle = function ({commit, state}, title) {
  commit(types.SET_DOCUMENT_TITLE, title, storeDocumentTitle(title))
}