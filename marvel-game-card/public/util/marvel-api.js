'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = window.jQuery;

var MarveApi = (function () {
	function MarveApi(key) {
		_classCallCheck(this, MarveApi);

		this.key = key;
		this.baseUrl = 'http://gateway.marvel.com/v1/public/';
	}

	_createClass(MarveApi, [{
		key: 'findSeries',
		value: function findSeries(title) {
			var url = '' + this.baseUrl + 'series?title=' + title + '&apikey=' + this.key;
			return Promise.resolve($.get(url));
		}
	}, {
		key: 'getResourceURI',
		value: function getResourceURI(resourceURI) {
			// este metodo es muy similar al de arriba.
			// ¿Podrías crear un método interno al que llamen estos dos?
			var url = '' + resourceURI + '?apikey=' + this.key;
			return Promise.resolve($.get(url));
		}
	}]);

	return MarveApi;
})();

window.MarvelApi = MarvelApi;