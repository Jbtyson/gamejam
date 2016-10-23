var Panel = function (position) {
	this.position = position || new Vector2();
	this.components = [];
	this.visible = true;
}

Panel.prototype = {
	update: function(elapsedTime) {
		this.components.forEach(function(component) {
			component.update(elapsedTime);
		});
  },

	render: function(elapsedTime, context) {
		this.components.forEach(function(component) {
			component.render(elapsedTime, context);
		});
	},

	addComponent(component) {
		component.position = component.position.add(this.position);
		this.components.push(component);
	},

	removeComponent(index) {
		this.components.splice(index, 1);
	},

	hide() {
		this.visible = false;
	},

	show: function() {
		this.visible = true;
	}
}