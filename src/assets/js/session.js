import storage from 'good-storage'

export function setItem(key, title) {
  return storage.session.set(key, title)
}

export function getItem(key) {
  return storage.session.get(key)
}