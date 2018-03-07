import $ from 'jquery'

let login = function(data) {
	return $.ajax({
		type: 'POST',
		url: 'api/login',
		data: data
	})
};

let getNewsMarquee = function() {
  return $.ajax({
    type: 'GET',
    url: 'api/newsMarquee'
  })
};

export default {
	login: login,
  getNewsMarquee: getNewsMarquee
}
