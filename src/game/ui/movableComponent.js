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
  this.text = component.text;
  this.textPosition = component.textPosition;
}

MovableComponent.prototype = {
	update: function(elapsedTime) {
  },

	render: function(elapsedTime, context) {
    if(this.textPosition === null) {
      var measureText = context.measureText(this.text);
      var textOffset = this.size.subtract(new Vector2(measureText.width, measureText.height)).divide(2);
      this.textPosition = this.position.add(textOffset);
    }

    if(this.visible) {
      var position = this.position;
      var textPosition = this.textPosition;
      if(this.pressed && this.pressedImage !== null) {
        if(typeof this.pressedOffset !== "undefined" && this.pressedOffset !== null) {}
          position = position.add(this.pressedOffset);
          textPosition = textPosition.add(this.pressedOffset);
        context.drawImage(this.pressedImage, position.x, position.y);
      }
      else if(this.hovering && this.hoverImage !== null) {
        var position = this.position;
        if(typeof this.hoverOffset !== "undefined" && this.hoverOffset !== null) {
          position = position.add(this.hoverOffset);
          textPosition = textPosition.add(this.hoverOffset);
        }
        context.drawImage(this.hoverImage, position.x, position.y);
      }
      else
        context.drawImage(this.image, this.position.x, this.position.y);

      context.fillText(this.text, textPosition.x, textPosition.y);
    }
	},
}
