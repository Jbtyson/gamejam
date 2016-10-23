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
    for(var i = 0; i < this.game.currencyManager.incomes.length; i++) {
      var button = new MovableComponent(
                                new UIComponent(
                                    new Vector2(10, 10 + (59 * i)),
                                    0,
                                    new Vector2(190, 49),
                                    ResourceManager.images.blueButtonNeutral,
                                    ResourceManager.images.blueButtonHover,
                                    ResourceManager.images.blueButtonPressed,
                                    this.game.currencyManager.incomes[i].name,
                                    "normal 18pt Calibri",
                                    "white"
                                    ),
                                null,
                                new Vector2(0, 4)
                              );
      button.incomeIndex = i;
      var _this = this;
      button.onClick = function() {
        _this.game.currencyManager.purchaseIncome(this.incomeIndex);
      }
      panel.addComponent(button);
    }

    panel.mousewheelUp = function() {
      this.translateComponents(new Vector2(0, 25));
    }

    panel.mousewheelDown = function() {
      this.translateComponents(new Vector2(0, -25));
    }

    return panel;
  },

  createRightPanel: function() {
    var panel = new Panel(new Vector2(600, 300), null, new Vector2(190, 49))
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
    if(this.mouseWheelUp)
      this.mousewheelUp();
    else if (this.mouseWheelDown)
      this.mousewheelDown();

    this.panels.forEach(function(panel) {
      panel.update(elapsedTime);
    });
  },

	render: function(elapsedTime, context) {
    this.panels.forEach(function(panel) {
      panel.render(elapsedTime, context);
    });
	},

  onMousewheelUp: function() {
    this.mouseWheelUp = true;
  },

  onMousewheelDown: function() {
    this.mouseWheelDown = true;
  },

  mousewheelUp: function() {
    this.mouseWheelUp = false;
    var hoveredPanel = null;
    var _this = this;
    this.panels.forEach(function(panel) {
      if(_this.contains(panel.position, panel.size, _this.game.inputManager.mousePosition))
        hoveredPanel = panel;
    });
    if(hoveredPanel !== null && hoveredPanel.mousewheelUp !== null)
      hoveredPanel.mousewheelUp();
  },

  mousewheelDown: function() {
    this.mouseWheelDown = false;
    var hoveredPanel = null;
    var _this = this;
    this.panels.forEach(function(panel) {
      if(_this.contains(panel.position, panel.size, _this.game.inputManager.mousePosition))
        hoveredPanel = panel;
    });
    if(hoveredPanel !== null && hoveredPanel.mousewheelUp !== null)
      hoveredPanel.mousewheelDown();
  },

  contains: function(position, size, v) {
    return v.greaterThanOrEqualTo(position) && v.lessThanOrEqualTo(position.add(size));
  },
}
