export function setItem(key, value) {
	if (!key || !value) return
	return window.localStorage.setItem(key, value)
};

export function getItem(key) {
	if (!key) return
	return window.localStorage.getItem(key)
};

export function clearAll() {
	window.localStorage.clear();
};

export function removeItem(key) {
	if (!key) return
	return window.localStorage.removeItem(key)
};