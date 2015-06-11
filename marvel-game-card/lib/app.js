var $ = window.jQuery
var MarvelApi = window.MarvelApi

var key = 'f6df629be962b0046a4c86303d8fd771'
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
  var characters = serie.characters.items
  var promises = []
  for (let character of characters) {
    let promise = api.getResourceURI(character.resourceURI)
    promises.push(promise)
  }
  return Promise.all(promises)
})
.then((characters) => {
  debugger
  console.log(characters)
})
.catch((err) => {
  console.error(err)
})
