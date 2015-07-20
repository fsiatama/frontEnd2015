
var $ = window.jQuery
var page = window.page

page('signin', signin)

page('/', function (argument) {
	console.log('Home')
})

page()

function signin () {
	console.log('signin')
}