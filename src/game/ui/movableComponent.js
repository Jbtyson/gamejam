var MovableComponent = function (component, hoverOffset, pressedOffset) {
  this.hoverOffset = hoverOffset;
  this.pressedOffset = pressedOffset;
  this.position = component.position;
  this.size = component.size;
  this.image = component.image;
  this.hoverImage = component.hoverImage;
  this.pressedImage = component.pressedImage;
  this.depth = component.depth;
  this.hovering = component.false;
  this.pressed = component.false;
  this.visible = component.visible;
}

MovableComponent.prototype = {
	update: function(elapsedTime) {
  },

	render: function(elapsedTime, context) {
    if(this.visible) {
      if(this.pressed && this.pressedImage !== null) {
        var position = this.position;
        if(typeof this.pressedOffset !== "undefined" && this.pressedOffset !== null)
          position = position.add(this.pressedOffset);
        context.drawImage(this.pressedImage, position.x, position.y);
      }
      else if(this.hovering && this.hoverImage !== null) {
        var position = this.position;
        if(typeof this.hoverOffset !== "undefined" && this.hoverOffset !== null)
          position = position.add(this.hoverOffset);
        context.drawImage(this.hoverImage, position.x, position.y);
      }
      else
        context.drawImage(this.image, this.position.x, this.position.y);
    }
	},
}
