var UI = function (game) {
  this.game = game;
  this.panels = [];
}

UI.prototype = {
  initialize: function() {
    this.panels.push(this.createTopPanel());
    this.panels.push(this.createLeftPanel());
    this.panels.push(this.createRightPanel());
  },

  createTopPanel: function() {
    var panel = new Panel(new Vector2(), ResourceManager.images.topPanel, new Vector2(1024, 50));
    panel.addComponent(new UIComponent(
                              new Vector2(25, 5),
                              0,
                              new Vector2(38, 39),
                              ResourceManager.images.coin,
                              null,
                              null,
                              "",
                              null,
                              null
                            ));
    var coinComponent = new UIComponent(
                              new Vector2(15, 13),
                              0,
                              new Vector2(200, 40),
                              null,
                              null,
                              null,
                              "0",
                              "normal 22pt Calibri",
                              "#FFD700"
                            );
    var _this = this;
    coinComponent.extendedUpdate = function() {
      this.text = _this.game.currencyManager.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    panel.addComponent(coinComponent);

    return panel;
  },

  createLeftPanel: function() {
    var panel = new Panel(new Vector2(0, 50), ResourceManager.images.leftPanel, new Vector2(307, 421));
    var dinghyButton = new MovableComponent(
                              new UIComponent(
                                  new Vector2(10, 10),
                                  0,
                                  new Vector2(190, 49),
                                  ResourceManager.images.blueButtonNeutral,
                                  ResourceManager.images.blueButtonHover,
                                  ResourceManager.images.blueButtonPressed,
                                  "Dinghy",
                                  "normal 18pt Calibri",
                                  "white"
                                  ),
                              null,
                              new Vector2(0, 4)
                            );
    var _this = this;
    dinghyButton.onClick = function() {
      _this.game.currencyManager.purchaseIncome(0);
    }
    panel.addComponent(dinghyButton);
    return panel;
  },

  createRightPanel: function() {
    var panel = new Panel(new Vector2(600, 300), null, new Vector2(190, 9))
    var clickerComponent = new MovableComponent(
                              new UIComponent(
                                  new Vector2(),
                                  0,
                                  new Vector2(190, 49),
                                  ResourceManager.images.redButtonNeutral,
                                  ResourceManager.images.redButtonHover,
                                  ResourceManager.images.redButtonPressed,
                                  "Click button",
                                  "normal 18pt Calibri",
                                  "white"
                                  ),
                              null,
                              new Vector2(0, 4)
                            );
    var _this = this;
    clickerComponent.onClick = function() {
      _this.game.currencyManager.coinClick();
    }
    panel.addComponent(clickerComponent);
    return panel;
  },

	update: function(elapsedTime) {
    this.panels.forEach(function(panel) {
      panel.update(elapsedTime);
    });
  },

	render: function(elapsedTime, context) {
    this.panels.forEach(function(panel) {
      panel.render(elapsedTime, context);
    });
	},
}
