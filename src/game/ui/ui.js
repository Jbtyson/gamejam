var UI = function () {
  this.panels = [];
}

UI.prototype = {
  initialize: function() {
    // left side buttons
    var leftPanel = new Panel(new Vector2(20, 20));
    leftPanel.addComponent(new MovableComponent(
                                new UIComponent(new Vector2(),
                                                  0,
                                                  new Vector2(190, 49),
                                                  ResourceManager.images.blueButtonNeutral,
                                                  ResourceManager.images.blueButtonHover,
                                                  ResourceManager.images.blueButtonPressed),
                           null,
                           new Vector2(0, 4)));

    this.panels.push(leftPanel);
    //02->04->03
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
