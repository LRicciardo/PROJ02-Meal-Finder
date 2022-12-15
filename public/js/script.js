var userInput = $('#user-form');
var submitButton = $('#form-submit');
var cardContainerEl = $('#cards');
var favButton = $('.favorite');
var favSection = $('#favorites-section');
var searchInputEl = $('#search-input');
var favArray = [];

const inputErrorModalEl = document.getElementById('input-error-modal');
const inputNoRecipesModalEl = document.getElementById('input-no-recipes-modal');
const dataNotFoundModalEl = document.getElementById('data-not-found-modal');
const cannotConnectModalEl = document.getElementById('cannot-connect-modal');
let currentSearch = '';

// An array of different apiKeys that will work in the fetch api call in the getSpoonApi function
var arrApiKeys = [
  'c39f000be15b48f0b51fc4215771d97b',
  'ad6278e15c864117bf13998d6f2409e0',
  'd4e89512419b4ecfae9d762561d78c97',
  '2cb1ecb32f4e4eb9a46acc15da086c22',
  'abed78e3630b46feafb9672300be48cc',
  'fe6c2d84686842f9af715566ad95611d',
  'd47220e0ade34b3ea9c039613858c695',
];

var getSpoonApi = function (event) {
  event.preventDefault();

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  };

  // Converts the user's input into a value the apiUrl will be able to read

  // var userText = document.querySelector('.input');
  // var input = userText.value.trim();
  // currentSearch = input.toUpperCase();

  // if (input === undefined || input === '') {
  //   inputErrorModalEl.classList.add('is-active');
  //   return;
  // }

  // // Chooses an apiKey at random from the arrApiKeys to be used in the fetch api call
  // function randomKey(arrApiKeys) {
  //   return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  // }

  // var dietParameter = '&diet=';

  // if (document.getElementById('veggie-option').checked === true) {
  //   dietParameter = dietParameter + 'vegetarian';
  // }

  // if (document.getElementById('vegan-option').checked === true) {
  //   dietParameter = dietParameter + 'vegan';
  // }

  // if (document.getElementById('gluten-free-option').checked === true) {
  //   dietParameter = dietParameter + 'gluten free';
  // }

  // if (document.getElementById('no-diet').checked === true) {
  //   dietParameter = dietParameter;
  // }

  // var apiUrl =
  //   'https://api.spoonacular.com/recipes/complexSearch?query=' +
  //   input +
  //   '&number=5&addRecipeInformation=true' +
  //   dietParameter +
  //   '&apiKey=' +
  //   randomKey(arrApiKeys);

  var apiUrl = `/api/recipe/getRecipeData?query=${searchInputEl.val()}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.results.length === 0) {
            inputNoRecipesModalEl.classList.add('is-active');
            $('#search-input').val('');
            return;
          }

          displayRecipeCards(data);
        });
      } else {
        dataNotFoundModalEl.classList.add('is-active');
        return;
      }
    })
    .catch(function (error) {
      cannotConnectModalEl.classList.add('is-active');
      return;
    });
};

// this function needs to have response from the API call as a parameter
var displayRecipeCards = function (data) {
  $('#search-input').val('');
  $('#cards').empty();
  $('#ingredients').empty();
  $('#instructions').empty();

  var boxDisplayEl = $('<div></div');
  boxDisplayEl.attr('class', 'box more-results-container');
  boxDisplayEl.attr('id', 'box');
  $('#cards').append(boxDisplayEl);

  var resultsTextHeader = $('<h1></h1>');
  resultsTextHeader.attr('class', 'results-text-header');
  resultsTextHeader.text(
    'Here are some recipes we found based off of your search for:  "' +
      currentSearch +
      '." Click the recipe image to see full recipe details.'
  );
  boxDisplayEl.append(resultsTextHeader);

  recipeContainerEl = $('<div></div');
  recipeContainerEl.attr(
    'class',
    'columns drag is-flex-tablet is-block-mobile is-justify-content-space-between is-flex-wrap-wrap recipe-container'
  );
  cardContainerEl.append(recipeContainerEl);

  function randomKey(arrApiKeys) {
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  }

  // for loop to create cards
  for (i = 0; i < 5; i++) {
    recipeCardEl = $('<div></div');
    recipeCardEl.attr(
      'class',
      'card column is-10-mobile mx-auto is-5-tablet is-4-desktop is-2-widescreen recipe-card my-4'
    );
    recipeCardEl.attr('id', data.results[i].id);
    recipeContainerEl.append(recipeCardEl);

    //set card image
    cardImg = $('<div></div');
    cardImg.attr('class', 'card-image');
    recipeCardEl.append(cardImg);

    cardFigureEl = $('<figure></figure>');
    cardFigureEl.attr('class', 'image');
    cardImg.append(cardFigureEl);

    // Creates an anchor tag within the figure tag and gives it the href attribute with the recipe link and takes the user to it in a new tab
    cardImgLinkEl = $('<a></a>');
    cardImgLinkEl.attr('href', data.results[i].sourceUrl);
    cardImgLinkEl.attr('target', '_blank');
    cardFigureEl.append(cardImgLinkEl);

    cardImgEl = $('<img></img>');
    cardImgEl.attr('src', data.results[i].image);
    cardImgEl.attr('alt', 'Picture of recipe');
    cardImgLinkEl.append(cardImgEl);

    // set card title div
    cardTitleEl = $('<div></div>');
    cardTitleEl.attr('class', 'card-title');
    recipeCardEl.append(cardTitleEl);

    // set card title
    cardTitleText = $('<h1></h1>');
    cardTitleText.attr('class', 'recipe-title title is-4');
    cardTitleText.text(data.results[i].title);
    cardTitleEl.append(cardTitleText);

    // set card body
    cardBodyEl = $('<div></div');
    cardBodyEl.attr('class', 'card-content');
    recipeCardEl.append(cardBodyEl);

    // set card content
    cardContentEl = $('<p></p>');
    cardContentEl.attr('class', 'content');
    cardContentEl.html(
      'Ready in ' +
        data.results[i].readyInMinutes +
        ' min' +
        '<br>' +
        'Servings: ' +
        data.results[i].servings +
        '<br>' +
        'Source: ' +
        data.results[i].sourceName
    );
    cardBodyEl.append(cardContentEl);
    cardContainerEl.append(recipeContainerEl);

    // create another content section in the recipe card
    cardButtonEl = $('<footer></footer>');
    cardButtonEl.attr('class', 'card-footer');
    recipeCardEl.append(cardButtonEl);

    // create the more info button on each recipe card
    cardFavoriteButton = $('<button></button>');
    cardFavoriteButton.attr('class', 'favorite card-footer-item button');
    cardFavoriteButton.text('SAVE');
    cardButtonEl.append(cardFavoriteButton);
  }
};

$(document).ready(function () {
  $('.button').click(function () {
    $('.submit').effect(
      'pulsate',
      {
        times: 3,
        distance: 10,
      },
      3000
    );
  });
});

//uses array of options to provide autocomplete options
$(function () {
  var dataSrc = [
    'apples',
    'avacado',
    'almond',
    'bacon',
    'bagel',
    'broccoli',
    'cabbage',
    'chicken',
    'cookies',
    'duck',
    'donuts',
    'dumplings',
    'eggs',
    'eel',
    'enchilada',
    'fish',
    'fajita',
    'franks',
    'garlic',
    'gumbo',
    'grits',
    'ham',
    'hash browns',
    'hot dogs',
    'ice cream',
    'indian food',
    'irish stew',
    'jambalaya',
    'jelly',
    'jalapeno',
    'kale',
    'kiwi',
    'kidney beans',
    'lobster',
    'lamb',
    'lasagna',
    'meatballs',
    'milk',
    'noodles',
    'pizza',
    'pancakes',
    'pepperoni',
    'quesadilla',
    'spinach',
    'toast',
    'venison',
    'waffles',
    'walnuts',
    'yogurt',
    'ziti',
  ];

  $('#search-input').autocomplete({
    source: dataSrc,
  });

  // Lines 307 - 312 came from https://miroslavpopovic.com/posts/2012/06/jqueryui-autocomplete-filter-words-starting-with-term
  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(term), 'i');
    return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
    });
  };
});

var updateCardText = function (idCallResponse) {
  currentCard = $('cards').find($);
  cardContentEl.text(idCallResponse.readyInMinutes);
};

var favButton = function (event) {
  var target = $(event.target);
  if (target.is('button.favorite')) {
    var targetCardTitle = target.parent().parent().find('h1').text();
    var targetCardUrl = target.parent().parent().find('a').attr('href');

    var storedRecipe = {
      title: targetCardTitle,
      url: targetCardUrl,
    };

    // check to see if this recipe already exists in the saved recipes array, if so, do not add another button, if not, add button
    if (favArray.some((arrObj) => arrObj.title == storedRecipe.title)) {
      return;
    } else {
      favArray.push(storedRecipe);
      saveRecipes();
      createFavRecipeButton(storedRecipe);
    }
  }
};

var createFavRecipeButton = function (storedRecipe) {
  newAnchor = $('<a>');
  newAnchor.attr('href', storedRecipe.url);
  newAnchor.attr('target', '_blank');

  newButton = $('<button></button>');
  newButton.attr(
    'class',
    'button is-fullwidth is-responsive my-2 saved-fav mx-auto'
  );
  newButton.text(storedRecipe.title);
  newAnchor.append(newButton);

  favSection.append(newAnchor);
};

for (i = 0; i < favArray.length; i++) {
  newAnchor = $('<a>');
  newAnchor.attr('href', savedFavRecipes[i].url);
  newAnchor.attr('target', '_blank');

  newButton = $('<button></button>');
  newButton.attr(
    'class',
    'button is-fullwidth is-responsive my-2 saved-fav mx-auto'
  );
  newButton.text(savedFavRecipes[i].title);
  newAnchor.append(newButton);

  favSection.append(newAnchor);
}

var saveRecipes = function () {
  localStorage.setItem('recipes', JSON.stringify(favArray));
};

$('#error-modal-bg, #error-modal-close-btn')
  .on('click', () => $('#error-modal').remove('is-active'));

$('#no-recipes-modal-bg, #no-recipes-modal-close-btn')
  .on('click', () => $('#no-recipes-modal').remove('is-active'));

$('#data-not-found-modal-bg, #data-not-found-modal-close-btn')
  .on('click', () => $('#data-not-found-modal').remove('is-active'));

$('#cannot-connect-modal-bg, #cannot-connect-modal-close-btn')
  .on('click', () => $('#cannot-connect-modal').remove('is-active'));

userInput.on('submit', getSpoonApi);
$(favButton).on('click', favButton);
