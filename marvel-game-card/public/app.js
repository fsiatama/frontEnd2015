'use strict';

var $ = window.jQuery;

var key = 'f6df629be962b0046a4c86303d8fd771';
var url = 'http://gateway.marvel.com/v1/public/series?title=avengers&apikey=a548aee0bde874ea460773884934a865';
var url2 = 'http://gateway.marvel.com/v1/public/characters/1009144';

Promise.resolve($.get(url)).then(function (results) {
	var characters = results.data.results[0].characters.items;
	var promises = [];

	for (var i in characters) {
		var character = characters[i];
		var characterUrl = character.resourceURI + '?apikey=' + key;
		promises.push(Promise.resolve($.get(characterUrl)));
	}
	return Promise.all(promises);
}).then(function (characters) {
	console.log(characters);
})['catch'](function (err) {
	console.error(err);
});

/*
var MarvelApi = window.MarvelApi

var api = new MarvelApi(key)
*/