
// Game state
var gs = {
  is_playing: false,
  category:   false, // assume for now
  words:      false,
  timer:      false,
  red_turn:   true,
  score:      [0, 0] // 0 is red, 1 is blue
};

var CATEGORIES = [
  'easy',
  'medium',
  'hard',
  'animals',
  'food_cooking',
  'household_items',
  'people',
  'travel',
  'all'
];

$(document).ready(function () {
  // Setup category select
  CATEGORIES.forEach(function (cat) {
    $('select').append(
      '<option value="' + cat + '">' + prettify_cat(cat) + '</option>'
    );
  });

  $('#big-button').click(function () {
    if (gs.is_playing) {
      // Got word
      // Display next word
      show_next_word();

      // Toggle turn
      gs.red_turn = !gs.red_turn;
      $('#red-score').toggleClass('turn');
      $('#blue-score').toggleClass('turn');

    } else {
      // Category
      gs.category = $('select').val();
      if (!gs.category) return;

      // Custom timer
      var duration = parseInt($('#timer-input').val());
      if (isNaN(duration) || duration > 180 || duration < 10) duration = 30;
      gs.timer = new Timer(duration, timer_update, timer_finish);

      // Fetch words
      get_words(gs.category, function () {
        $('.menu').fadeOut(function () {
          // Start game
          gs.is_playing = true;
          $('#big-button').text('Got it!');
          $('#sml-button').text('Skip');
          $('#red-score').addClass('turn');

          // Start timer
          gs.timer.start();

          // Display first word
          show_next_word();
        });
      });
    }
  });

  $('#sml-button').click(function () {
    if (!gs.is_playing) return;
    show_next_word();
    // add one to opponent score
    update_score(1);
  });
});

/******************************* View functions *******************************/

var show_next_word = function () {
  if (!gs.words || !gs.words.length) {
    return console.error('Error: No words.');
  }

  // Grab random word from cache
  var idx = Math.floor(Math.random() * gs.words.length);
  var word = gs.words.splice(idx, 1);
  $('#phrase p').html(word);
}

/**
 * Passed to the timer. Receives the number of seconds remaining as a param
 */
var timer_update = function (remaining) {
  var mins = 0;

  // Convert seconds to minutes
  if (remaining > 59) {
    while (remaining > 59) {
      remaining -= 60;
      mins++;
    }
    rem_str = mins + ':' + remaining;
  }
  // Format string
  if (remaining < 10) {
    remaining = '0' + remaining;
  }
  $('#timer').text(mins + ':' + remaining);
}

/**
 * Passed to the timer
 */
var timer_finish = function () {
  gs.is_playing = false;

  // Opposite team scores 2 points
  update_score(2);

  // Reset for next round
  setTimeout(function () {
    $('#phrase p').text('');
    $('header .team, header .score').addClass('remain');
    $('.menu').fadeIn();
    $('#big-button').text('Start');
    $('#sml-button').text('Rules');
  }, 500);
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
