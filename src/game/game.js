var Game = function (resourceManager) {
  this.ui = new UI();
  this.ui.initialize();
  var _this = this;
  this.inputManager = new InputManager(_this);
}

Game.prototype = {
	update: function(elapsedTime) {
    this.ui.update(elapsedTime);
    this.inputManager.update();
  },

	render: function(elapsedTime, context) {
    this.ui.render(elapsedTime, context);
	},
}
