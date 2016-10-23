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

	render: function(elapsedTime, context, pposition, size) {
    if(this.textPosition === null) {
      var measureText = context.measureText(this.text);
      var textOffset = this.size.subtract(new Vector2(measureText.width, measureText.height)).divide(2);
      this.textPosition = this.position.add(textOffset);
    }

    var position = this.position;
    var renderPosition = new Vector2()
    var renderSize = this.size;

    if(this.position.y < pposition.y) {
      renderPosition.y = (pposition.y - this.position.y);
      renderSize.y = this.size.y - (pposition.y - this.position.y);
      position.y = pposition.y;
    }

    if (this.position.y + this.size.y > pposition.y + size.y) {
      renderSize.y = this.size.y - (this.position.y + this.size.y) - (pposition.y + size.y);
    }

    if(this.visible & this.image !== null)
      if(this.pressed && this.pressedImage !== null)
        context.drawImage(this.pressedImage, renderPosition.x, renderPosition.y, renderSize.x, renderSize.y, position.x, position.y, renderSize.x, renderSize.y);
      else if(this.hovering && this.hoverImage !== null)
        context.drawImage(this.hoverImage, renderPosition.x, renderPosition.y, renderSize.x, renderSize.y, position.x, position.y, renderSize.x, renderSize.y);
      else
        context.drawImage(this.image, renderPosition.x, renderPosition.y, renderSize.x, renderSize.y, position.x, position.y, renderSize.x, renderSize.y);

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
