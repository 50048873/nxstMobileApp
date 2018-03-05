export function setItem(id, key, value) {
	let nxst = window.localStorage.__nxst__;
	if (!nxst) {
		nxst = {};
		nxst[id] = {};
	} else {
		nxst = JSON.parse(nxst);
		if (!nxst[id]) {
			nxst[id] = {};
		}
	}
	nxst[id][key] = value;
	window.localStorage.__nxst__ = JSON.stringify(nxst);
};

export function getItem(id, key) {
	let nxst = window.localStorage.__nxst__;

	nxst = nxst && JSON.parse(nxst)[id];

	if (!key) {
		return nxst
	}
	
	return nxst[key];
};
