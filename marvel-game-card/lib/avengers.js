let $ = window.jQuery
let MarvelApi = window.MarvelApi

let key = 'f6df629be962b0046a4c86303d8fd771'
let api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
  let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
  $('.Layout').css('background-image', serieImage)
  let characters = serie.characters.items
  let promises = []
  for (let character of characters) {
    let promise = api.getResourceURI(character.resourceURI)
    promises.push(promise)
  }
  return Promise.all(promises)
})
.then((characters) => {
  return characters.filter((character) => !!character.thumbnail )
})
.then((characters) => {
  
  $('.Card').each((i, item) => {
    let character = characters[i]
    let $this = $(item)
    let $image = $this.find('.Card-image')
    let $description = $this.find('.Card-description')
    let $name = $this.find('.Card-name')
    $image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)
    $name.text(`${character.name}`)
    $description.text(`${character.description}`)
  })

})
.catch((err) => {
  console.error(err)
})
