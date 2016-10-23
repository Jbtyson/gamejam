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
  this.font = component.font
  this.textPosition = component.textPosition;
  this.textColor = component.textColor;
  this.pressedLastFrame = component.pressedLastFrame;
}

MovableComponent.prototype = {
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
      context.font = this.font;
      var measureText = context.measureText(this.text);
      var textOffset = this.size.subtract(new Vector2(measureText.width, measureText.height)).divide(2);
      this.textPosition = this.position.add(textOffset);
    }

    var position = this.position;
    var textPosition = this.textPosition;
    var renderPosition = new Vector2();
    var renderSize = this.size;

    if(position.y < pposition.y) {
      renderPosition.y = pposition.y - position.y;
      renderSize.y = this.size.y - (pposition.y - position.y);
      position.y = pposition.y;
    }

    if (position.y + this.size.y > pposition.y + size.y)
      renderSize.y = this.size.y - (position.y + this.size.y) - (pposition.y + size.y);

    if(this.visible && this.image !== null) {
      if(this.pressed && this.pressedImage !== null) {
        if(typeof this.pressedOffset !== "undefined" && this.pressedOffset !== null) {
          position = position.add(this.pressedOffset);
          textPosition = textPosition.add(this.pressedOffset);
          context.drawImage(this.pressedImage, renderPosition.x, renderPosition.y, renderSize.x, renderSize.y, position.x, position.y, renderSize.x, renderSize.y);
        }
      }
      else if(this.hovering && this.hoverImage !== null) {
        if(typeof this.hoverOffset !== "undefined" && this.hoverOffset !== null) {
          position = position.add(this.hoverOffset);
          textPosition = textPosition.add(this.hoverOffset);
        }
        context.drawImage(this.hoverImage, renderPosition.x, renderPosition.y, renderSize.x, renderSize.y, position.x, position.y, renderSize.x, renderSize.y);
      }
      else {
        context.drawImage(this.image, renderPosition.x, renderPosition.y, renderSize.x, renderSize.y, position.x, position.y, renderSize.x, renderSize.y);
      }

      if(this.text !== "" && this.font !== null) {
        context.font = this.font;
        context.fillStyle = this.textColor;
        context.fillText(this.text, textPosition.x, textPosition.y);
      }
    }
	},

  onClick: function() {
  },

  extendedUpdate: function(elapsedTime) {
  }
}
