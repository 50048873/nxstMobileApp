export function setItem(key, value) {
	window.sessionStorage.setItem(key, value)
};

export function getItem(key) {
	return window.sessionStorage.getItem(key)
};