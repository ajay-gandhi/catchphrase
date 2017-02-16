
function Timer (duration, update, finish) {
  // Timer properties
  this.start_time = false,
  this.timer_int  = false,
  this.timer_dur  = duration;

  // Interval functions
  this.update = update;
  this.finish = finish;
}

/**
 * Starts the timer. Calls update() when the time remaining changes, and
 * calls finish() when time is up
 */
Timer.prototype.start = function () {
  // Initialize
  this.start_time = Date.now() / 1000;
  this.update(this.timer_dur);

  // Setup interval
  this.timer_int = setInterval(function (self) {
    var time_left = self.timer_dur - (Date.now() / 1000 - self.start_time);
    time_left = Math.ceil(time_left);
    self.update(time_left);

    // Time up
    if (time_left <= 0) {
      clearInterval(self.timer_int);
      self.finish();
    }
  }, 500, this);
}
