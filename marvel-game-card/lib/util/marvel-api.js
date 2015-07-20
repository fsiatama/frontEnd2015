let $ = window.jQuery

class MarvelApi {
  constructor (key) {
    this.key = key
    this.baseUrl = 'http://gateway.marvel.com/v1/public/'
  }

  findSeries (title) {
    let url = `${this.baseUrl}series?title=${title}&apikey=${this.key}`

    if (localStorage[url]) {
      let datos = localStorage[url];
      datos = JSON.parse(datos)
      console.log('con cache')
      return Promise.resolve(datos)
    } 
    return Promise.resolve($.get(url))
    .then((res) => {
      let datos = res.data.results[0]
      datos = JSON.stringify(datos)
      localStorage[url] = datos
      console.log('sin cache')
      Promise.resolve(datos)
    })
  }

  getResourceURI (resourceURI) {
    let url = `${resourceURI}?apikey=${this.key}`

    if (localStorage[url]) {
      let datos = localStorage[url];
      datos = JSON.parse(datos)
      console.log('con cache personajes')
      return Promise.resolve(datos)
    }
    return Promise.resolve($.get(url))
    .then((res) => {
      let datos = res.data.results[0]
      datos = JSON.stringify(datos)
      localStorage[url] = datos
      console.log('sin cache personajes')
      Promise.resolve(datos)
    })
  }

  searchCharacter (name) {
    // 'http://gateway.marvel.com/v1/public/'
    // /characters?name=man&apikey=a548aee0bde874ea460773884934a865
    let url = `${this.baseUrl}/characters?name=${name}&apikey=${this.key}`
    return new Promise(function (done) {
      $.get(url).done(function (data) {
        done(data)
      })
    })
    .then(function (res) {
      // falsy -> 0, '', null, undefined, NaN
      // !0, !'', !null, !undefined, !NaN -> true
      if (!res.data.total) {
        return Promise.reject('no se encontro el personaje')
      }
      return res.data.results[0]
    })
  }
}

window.MarvelApi = MarvelApi
