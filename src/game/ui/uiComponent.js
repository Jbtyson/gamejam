var UIComponent = function (position, depth, size, image, hoverImage, pressedImage) {
  this.position = position || new Vector2();
  this.size = size;
  this.image = image;
  this.hoverImage = hoverImage;
  this.pressedImage = pressedImage;
  this.depth = depth || 0;
  this.hovering = false;
  this.pressed = false;
  this.visible = true;
}

UIComponent.prototype = {
	update: function(elapsedTime) {
  },

	render: function(elapsedTime, context) {
    if(this.visible)
        context.drawImage(this.pressedImage, position.x, position.y);
      else if(this.hovering && this.hoverImage !== null)
        context.drawImage(this.hoverImage, position.x, position.y);
      else
        context.drawImage(this.image, this.position.x, this.position.y);
    }
  },
}
