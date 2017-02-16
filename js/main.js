
// Game state
var gs = {
  is_playing: false,
  category:   'easy', // assume for now
  words:      false,
  timer:      false,
  red_turn:   true,
  score:      [0, 0] // 0 is red, 1 is blue
};

var CATEGORIES = [
  'animals',
  'easy',
  'food_cooking',
  'hard',
  'household_items',
  'medium',
  'people',
  'travel',
  'all'
];

$(document).ready(function () {
  gs.timer = new Timer(10, timer_update, timer_finish);

  $('#main-button').click(function () {
    if (gs.is_playing) {
      // Got word
      // Display next word
      show_next_word();

      // Toggle turn
      gs.red_turn = !gs.red_turn;

    } else {
      // Fetch words
      get_words(gs.category, function () {
        // Start game
        gs.is_playing = true;
        $('#main-button').text('Got it!');

        // Start timer
        gs.timer.start();

        // Display first word
        show_next_word();
      });
    }
  });

  $('#skip-button').click(function () {
    show_next_word();
    // add one to opponent score
    update_score(1);
  });
});

/******************************* View functions *******************************/

var show_next_word = function () {
  if (!gs.is_playing || !gs.words || !gs.words.length) {
    return console.error('Error: Invalid status.');
  }

  // Grab random word from cache
  var idx = Math.floor(Math.random() * gs.words.length);
  $('#phrase').text(gs.words.splice(idx, 1));
}

/**
 * Passed to the timer. Receives the number of seconds remaining as a param
 */
var timer_update = function (remaining) {
  if (remaining < 10) remaining = '0' + remaining;
  var rem_str = '0:' + remaining;
  $('#timer').text(rem_str);
}

/**
 * Passed to the timer
 */
var timer_finish = function () {
  gs.is_playing = false;
  $('#timer').text('done');

  // Opposite team scores 2 points
  update_score(2);

  // Reset for next round
  $('#main-button').text('Start');
}

/**
 * Updates the score for the opposite team
 */
var update_score = function (amount) {
  gs.score[gs.red_turn ? 1 : 0] += amount;
  var elm = gs.red_turn ? $('#blue-score') : $('#red-score');
  elm.text(gs.score[gs.red_turn ? 1 : 0]);
}

/******************************* Misc functions *******************************/

/**
 * Fetches the words for the given category from the server
 */
var get_words = function (cat, cb) {
  if (cat === 'all') {
    gs.words = [];
    var done = 0;

    // Grab all wordlists together
    CATEGORIES.forEach(function (c) {
      $.getJSON('wordlists/' + c + '.json', function (data) {
        gs.words = gs.words.concat(data.gs.words);
        done++;

        // Wait for last request to finish
        if (done == CATEGORIES.length && cb) cb(gs.words);
      });
    });

  } else {
    // Grab wordlist, cache it, and call the callback
    $.getJSON('wordlists/' + cat + '.json', function (data) {
      gs.words = data.words;
      if (cb) cb(gs.words);
    });
  }
}

/**
 * Prettifies a category
 */
var prettify_cat = function (cat) {
  var translation = {
    'animals':         'Animals',
    'easy':            'Easy',
    'food_cooking':    'Food, Cooking',
    'hard':            'Hard',
    'household_items': 'Household Items',
    'medium':          'Medium',
    'people':          'People',
    'travel':          'Travel',
    'all':             'All'
  }
  return translation[cat];
}
