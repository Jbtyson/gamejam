var ResourceManager = function () {
  this.images = {
    blueButtonNeutral: new Image(),
    blueButtonHover: new Image(),
    blueButtonPressed: new Image()
  }

  this.assetCount = Object.keys(this.images).length;
  this.loadedCount = 0;
  this.percentage = 0;
  this.loaded = false;
}

ResourceManager.prototype = {
  load: function() {
    // gui
    this.images.blueButtonNeutral.onload = this.onLoad;
    this.images.blueButtonNeutral.src = "assets/ui/blueButton_neutral.png";
    this.images.blueButtonHover.onload = this.onLoad;
    this.images.blueButtonHover.src = "assets/ui/blueButton_hover.png";
    this.images.blueButtonPressed.onload = this.onLoad;
    this.images.blueButtonPressed.src = "assets/ui/blueButton_pressed.png";
  },

  onLoad: function() {
    ResourceManager.loadedCount++
    if(ResourceManager.loadedCount === ResourceManager.assetCount)
      ResourceManager.loaded = true;
  }
}
