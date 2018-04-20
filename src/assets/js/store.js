import storage from 'good-storage'

export function setItem(key, title) {
  return storage.set(key, title)
}

export function getItem(key) {
  return storage.get(key)
}