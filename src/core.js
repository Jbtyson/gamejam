// game.js

// Screen Size
var WIDTH = 1024;
var HEIGHT = 576;

// Fixed time step of 1/60th a second
var TIME_STEP = 1000/60;

// RESOURCES
//Resource.img.reticle = new Image();
//Resource.img.reticle.src = "img/reticle.png";

//Resource.sfx.collide = new Audio();
//Resource.sfx.collide.src = "collide.wav";

// Game class
//----------------------------------
var Core = function (canvasId) {
	this.screen = document.getElementById(canvasId);
	this.screenContext = this.screen.getContext('2d');
	this.backBuffer = document.createElement('canvas');
	this.backBuffer.width = this.screen.width;
	this.backBuffer.height = this.screen.height;
	this.backBufferContext = this.backBuffer.getContext('2d');

	this.mouse = { x:0, y:0 };
  var offset = $('#game').offset()
  this.mouseOffset = { x:offset.left, y:offset.top };

	// Timing variables
	this.elapsedTime = 0.0;
	this.startTime = 0;
	this.lastTime = 0;
	this.gameTime = 0;
	this.fps = 0;
	this.STARTING_FPS = 60;

  this.game = new Game();
}

Core.prototype = {

	// Update the game world.  See
	update: function(elapsedTime) {
		var _this = this;
    _this.game.update(elapsedTime);
  },

	render: function(elapsedTime) {
		var _this = this;

		this.backBufferContext.fillStyle = "#000";
		this.backBufferContext.fillRect(0, 0, WIDTH, HEIGHT);

		context = this.backBufferContext;
    _this.game.render(elapsedTime, context);

		this.screenContext.drawImage(this.backBuffer, 0, 0);
	},

	start: function() {
		var _this = this;

		//window.onkeydown = function (e) { _this.keyDown(e); };
		window.oncontextmenu = function(e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		};

		this.startTime = Date.now();

		window.requestNextAnimationFrame(
			function(time) {
				_this.loop.call(_this, time);
			}
		);
	},

	// The game loop.  See
	// http://gameprogrammingpatterns.com/game-loop.html
	loop: function(time) {
		var _this = this;

		// Don't advance the clock if the game is paused
		if(this.paused || this.gameOver) this.lastTime = time;

		// Calculate additional elapsed time, keeping any
		// unused time from previous frame
		this.elapsedTime += time - this.lastTime;
		this.lastTime = time;

		// The first timestep (and occasionally later ones) are too large
		// causing our processing to take too long (and run into the next
    // frame).  We can clamp to a max of 4 frames to keep that from
    // happening
		this.elapsedTime = Math.min(this.elapsedTime, 4 * TIME_STEP);

		// We want a fixed game loop of 1/60th a second, so if necessary run multiple
		// updates during each rendering pass
		// Invariant: We have unprocessed time in excess of TIME_STEP
		while (this.elapsedTime >= TIME_STEP) {
			_this.update(TIME_STEP);
			this.elapsedTime -= TIME_STEP;

			// add the TIME_STEP to gameTime
			this.gameTime += TIME_STEP;
		}

		// We only want to render once
		_this.render(this.elapsedTime);

		// Repeat the game loop
		window.requestNextAnimationFrame(
			function(time) {
				_this.loop.call(_this, time);
			}
		);
	}
}

var core = new Core('game');
console.log(core);
core.start();
