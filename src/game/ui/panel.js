var Panel = function (position, image, size) {
	this.position = position || new Vector2();
	this.image = image;
	this.size = size;
	this.components = [];
	this.visible = true;
	this.mousewheelUp = null;
	this.mousewheelDown = null;
}

Panel.prototype = {
	update: function(elapsedTime) {
		this.components.forEach(function(component) {
			component.update(elapsedTime);
		});
  },

	render: function(elapsedTime, context) {
		if(!this.visibile && this.image !== null)
			context.drawImage(this.image, this.position.x, this.position.y)

		var _this = this;
		this.components.forEach(function(component) {
			component.render(elapsedTime, context, _this.position, _this.size);
		});
	},

	addComponent(component) {
		component.position = component.position.add(this.position);
		this.components.push(component);
	},

	removeComponent(index) {
		this.components.splice(index, 1);
	},

	translateComponents(vector) {
		this.components.forEach(function(component) {
			component.position = component.position.add(vector);
			component.textPosition = component.textPosition.add(vector);
		});
	},

	hide() {
		this.visible = false;
	},

	show: function() {
		this.visible = true;
	}
}
