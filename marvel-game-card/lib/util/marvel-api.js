var $ = window.jQuery
class MarveApi {
	constructor (key) {
		this.key = key
		this.baseUrl = 'http://gateway.marvel.com/v1/public/'
	}

	findSeries (title) {
		let url = `${this.baseUrl}series?title=${title}&apikey=${this.key}`
		return Promise.resolve($.get(url))
	}

	getResourceURI (resourceURI) {
	    // este metodo es muy similar al de arriba.
	    // ¿Podrías crear un método interno al que llamen estos dos?
	    let url = `${resourceURI}?apikey=${this.key}`
	    return Promise.resolve($.get(url))
	}
}

window.MarvelApi = MarvelApi
