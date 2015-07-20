'use strict';

var $ = window.jQuery;
var MarvelApi = window.MarvelApi;

var key = 'f6df629be962b0046a4c86303d8fd771';
var api = new MarvelApi(key);

api.findSeries('avengers').then(function (serie) {
  var serieImage = 'url(' + serie.thumbnail.path + '.' + serie.thumbnail.extension + ')';
  $('.Layout').css('background-image', serieImage);
  var characters = serie.characters.items;
  var promises = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var character = _step.value;

      var promise = api.getResourceURI(character.resourceURI);
      promises.push(promise);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Promise.all(promises);
}).then(function (characters) {
  return characters.filter(function (character) {
    return !!character.thumbnail;
  });
}).then(function (characters) {

  characters = shuffle(characters);

  for (var i = 0; i < 5; i++) {
    var character = characters[i];
    var template = renderCharacter(character);
    var $card = $(template);
    $('.Battle-player').append($card);
  }

  $('.Card').each(function (i, item) {
    var character = characters[i];
    var $this = $(item);
    var $image = $this.find('.Card-image');
    var $description = $this.find('.Card-description');
    var $name = $this.find('.Card-name');
    $image.attr('src', '' + character.thumbnail.path + '.' + character.thumbnail.extension);
    $name.text('' + character.name);
    $description.text('' + character.description);
  });
})['catch'](function (err) {
  console.error(err);
});

$('.CharacterForm').on('submit', function (event) {
  event.preventDefault();

  var name = $(this).find('.CharacterForm-name').val();
  api.searchCharacter(name).then(function (character) {
    drawCharacter(character);
  })['catch'](function (reason) {
    if (reason === 'no se encontro el personaje') {
      $('.CharacterForm-message').text(reason);
    }
  });
});

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i];
    var index = Math.floor(Math.random() * arr.length - 1);
    arr[i] = arr[index];
    arr[index] = tmp;
  }
  return arr;
}

function renderCharacter(character) {
  var attackPoints = Math.ceil(Math.random() * 500) + 500;
  // genera un numero del 500 al 1000
  return '\n  <div class="Card ">\n    <div class="Card-container">\n      <h2 class="Card-name">' + character.name + '</h2><img src="' + character.thumbnail.path + '.' + character.thumbnail.extension + '" alt="wolverine" class="Card-image">\n      <div class="Card-description">' + character.description + '</div>\n      <div class="Card-attack" data-attack="' + attackPoints + '">' + attackPoints + ' puntos de ataque</div>\n    </div>\n    <div class="Card-backface"> </div>\n  </div>';
}

function drawCharacter(character) {
  var template = renderCharacter(character);
  var $card = $(template);
  $card.on('click', function (event) {
    var $this = $(this);
    var attack = $this.find('.Card-attack');
    console.log(attack.data('attack'));
  });
  $('.Battle-player').append($card);
}
// llamar a la api de marvel
// dibujar una carta con el personaje que regrese la api
//  - si no regresa un personaje -> no hay personaje
//  - si regresa solo un personaje -> dibujar carta
//  - si regresa mas de un personaje -> dibujar carta con el primer personaje que regrese