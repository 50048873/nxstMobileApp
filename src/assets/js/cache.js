import storage from 'good-storage'

export function storeDocumentTitle(title) {
  return storage.session.set('documentTitle', title)
}

export function loadDocumentTitle() {
  return storage.session.get('documentTitle')
}