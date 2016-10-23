var WIDTH = 1024;
var HEIGHT = 576;
var TIME_STEP = 1000/60;

var ResourceManager = new ResourceManager();
ResourceManager.load();

var Core = function (canvasId) {
	this.screen = document.getElementById(canvasId);
	this.screenContext = this.screen.getContext('2d');
	this.backBuffer = document.createElement('canvas');
	this.backBuffer.width = this.screen.width;
	this.backBuffer.height = this.screen.height;
	this.backBufferContext = this.backBuffer.getContext('2d');

	this.elapsedTime = 0.0;
	this.startTime = 0;
	this.lastTime = 0;
	this.gameTime = 0;
	this.fps = 0;
	this.STARTING_FPS = 60;

  this.game = new Game();
}

Core.prototype = {
	update: function(elapsedTime) {
		var _this = this;
    _this.game.update(elapsedTime);
  },

	render: function(elapsedTime) {
		var _this = this;

		this.backBufferContext.fillStyle = "#000";
		this.backBufferContext.fillRect(0, 0, WIDTH, HEIGHT);

		context = this.backBufferContext;
		context.font = 'normal 18pt Calibri';
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

	loop: function(time) {
		var _this = this;

		if(this.paused || this.gameOver) this.lastTime = time;

		this.elapsedTime += time - this.lastTime;
		this.lastTime = time;

		this.elapsedTime = Math.min(this.elapsedTime, 4 * TIME_STEP);

		while (this.elapsedTime >= TIME_STEP) {
			_this.update(TIME_STEP);
			this.elapsedTime -= TIME_STEP;
			this.gameTime += TIME_STEP;
		}

		_this.render(this.elapsedTime);

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
