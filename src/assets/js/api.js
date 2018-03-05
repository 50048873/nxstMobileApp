import $ from 'jquery'
let login = function(data) {
	return $.ajax({
		type: 'POST',
		url: 'api/login',
		data: data
	})
};

export default {
	login: login
}
