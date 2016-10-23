var Game = function (resourceManager) {
  var _this = this;
  this.inputManager = new InputManager(_this);
  this.currencyManager = new CurrencyManager(_this);
  this.ui = new UI(_this);
  this.ui.initialize();
  this.background = ResourceManager.images.background;
}

Game.prototype = {
	update: function(elapsedTime) {
    this.ui.update(elapsedTime);
    this.inputManager.update(elapsedTime);
    this.currencyManager.update(elapsedTime);
  },

	render: function(elapsedTime, context) {
    context.drawImage(this.background, 0, 50);

    this.ui.render(elapsedTime, context);
	},
}
