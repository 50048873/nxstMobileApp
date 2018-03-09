export function setItem(id, key, value) {
	if (!key || !value) return
	let nxst = window.localStorage.__nxst__;
	if (!nxst) {
		nxst = {};
		nxst[id] = [];
	} else {
		nxst = JSON.parse(nxst);
		if (!nxst[id]) {
			nxst[id] = [];
		}
	}
	let nxstArr = nxst[id]
	let userInfo = {
		username: key,
		password: value,
		time: new Date() * 1
	}
	if (nxstArr.length) { 
		let res = nxstArr.every((item) => {
			return item.username !== key
		})
		res && nxstArr.push(userInfo)
	} else {
		nxstArr.push(userInfo)
	}

	let temp = {}
	temp[id] = nxstArr
	
	window.localStorage.__nxst__ = JSON.stringify(temp);
};

export function getItem(id, key) {
	let nxst = window.localStorage.__nxst__;
	nxst = nxst && JSON.parse(nxst)[id];
	if (!key) {
		return nxst
	}
	return nxst[key];
};

export function clearAll() {
	window.localStorage.clear();
};

export function removeItem(id, key) {
	let nxst = window.localStorage.__nxst__;
	if (nxst && nxst.length) {
		let	nxstArr = JSON.parse(nxst)
		nxstArr.forEach((item, index) => {
			if (item.username === key) {
				nxstArr.splice(index, 1)
			}
		})
		window.localStorage.__nxst__ = JSON.stringify(nxstArr)
	}
};

