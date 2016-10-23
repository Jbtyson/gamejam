var UIComponent = function (position, depth, size, image, hoverImage, pressedImage, text, font, textColor) {
  this.position = position || new Vector2();
  this.size = size;
  this.image = image;
  this.hoverImage = hoverImage;
  this.pressedImage = pressedImage;
  this.depth = depth || 0;
  this.hovering = false;
  this.pressed = false;
  this.visible = true;
  this.text = text;
  this.textPosition = null;
  this.font = font;
  this.textColor = textColor;
  this.pressedLastFrame = false;
}

UIComponent.prototype = {
	update: function(elapsedTime) {
    if(!this.pressedLastFrame && this.pressed) {
      this.onClick();
      this.pressedLastFrame = true;
    }
    else if (this.pressedLastFrame && !this.pressed) {
      this.pressedLastFrame = false;
    }

    this.extendedUpdate(elapsedTime);
  },

	render: function(elapsedTime, context) {
    if(this.textPosition === null) {
      var measureText = context.measureText(this.text);
      var textOffset = this.size.subtract(new Vector2(measureText.width, measureText.height)).divide(2);
      this.textPosition = this.position.add(textOffset);
    }

    if(this.visible & this.image !== null)
      if(this.pressed && this.pressedImage !== null)
        context.drawImage(this.pressedImage, this.position.x, this.position.y);
      else if(this.hovering && this.hoverImage !== null)
        context.drawImage(this.hoverImage, this.position.x, this.position.y);
      else
        context.drawImage(this.image, this.position.x, this.position.y);

      if(this.text !== "" && this.font !== null){
        context.font = this.font;
        context.fillStyle = this.textColor;
        context.fillText(this.text, this.textPosition.x, this.textPosition.y);
      }
  },

  onClick: function() {
  },

  extendedUpdate: function(elapsedTime) {
  }
}
