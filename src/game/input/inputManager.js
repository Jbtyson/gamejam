var InputManager = function (game) {
  this.game = game;
  this.mousePosition = new Vector2();
  var offset = $('#game').offset()
  this.mouseOffset = new Vector2(offset.left, offset.top);
  this.hoveredElement = null;

  var _this = this;
  var screen = this.screen = document.getElementById("game");
  screen.onmousemove = function(e) { _this.mousemove(e); };
	screen.onmousedown = function(e) { _this.mousedown(e); };
	screen.onmouseup =   function(e) { _this.mouseup(e); };
}

InputManager.prototype = {
	update: function(elapsedTime) {
    if(this.hoveredElement !== null)
      this.hoveredElement.hovering = false;

    var newElement = this.checkForHitOnGui();

    if(newElement !== null) {
      if(newElement !== this.hoveredElement && this.hoveredElement !== null) {
        this.hoveredElement.hovering = false;
        this.hoveredElement.pressed = false;
      }
      newElement.hovering = true;
    }
    this.hoveredElement = newElement;
  },

	render: function(elapsedTime, context) {
	},

  checkForHitOnGui: function() {
    var hits = [];
    var _this = this;

    this.game.ui.panels.forEach(function(panel) {
      panel.components.forEach(function(component) {
        if(_this.mousePosition.greaterThanOrEqualTo(component.position) && _this.mousePosition.lessThanOrEqualTo(component.position.add(component.size)))
          hits.push(component);
      });
    });

    if (hits.length > 0)
      return this.getTopElement(hits);

    return null;
  },

  getTopElement: function(elements) {
    var index = -1;
    var value = 99999999;
    for(var i = 0; i < elements.length; i++) {
      if(elements[i].depth < value) {
        value = elements[i].depth;
        index = i;
      }
    }
    return elements[index];
  },

  contains: function(position, size, v) {
    return v.greaterThanOrEqualTo(position) && v.lessThanOrEqualTo(position.add(size));
  },

  mousemove: function(e) {
		var self = this;
    this.mousePosition = new Vector2(e.clientX - this.mouseOffset.x, e.clientY - this.mouseOffset.y);
    if(this.hoveredElement !== null && !this.contains(this.hoveredElement.position, this.hoveredElement.size, this.mousePosition))
      this.hoveredElement.pressed = false;
	},

  /* mouse buttons:
   * 0 = left click
   * 1 = middle click
   * 2 = right click
   */
  mousedown: function(e) {
		var _this = this;

		if (e.button == 0) {
      if(this.hoveredElement !== null) {
        this.hoveredElement.hovering = false;
        this.hoveredElement.pressed = true;
      }
		}
	},

	mouseup: function(e) {
		var _this = this;

    if(e.button == 0) {
      if(this.hoveredElement !== null) {
        this.hoveredElement.hovering = true;
        this.hoveredElement.pressed = false;
      }
    }
	},
}
