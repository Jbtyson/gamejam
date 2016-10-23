var ResourceManager = function () {
  this.images = {
    background: new Image(),
    coin: new Image(),

    blueButtonNeutral: new Image(),
    blueButtonHover: new Image(),
    blueButtonPressed: new Image(),
    redButtonNeutral: new Image(),
    redButtonHover: new Image(),
    redButtonPressed: new Image(),

    topPanel: new Image(),
    leftPanel: new Image(),

  }

  this.assetCount = Object.keys(this.images).length;
  this.loadedCount = 0;
  this.percentage = 0;
  this.loaded = false;
}

ResourceManager.prototype = {
  load: function() {
    this.images.background.onload = this.onLoad;
    this.images.background.src = "assets/ui/background.png";
    this.images.coin.onload = this.onLoad;
    this.images.coin.src = "assets/ui/coin.png";

    // buttons
    this.images.blueButtonNeutral.onload = this.onLoad;
    this.images.blueButtonNeutral.src = "assets/ui/blueButton_neutral.png";
    this.images.blueButtonHover.onload = this.onLoad;
    this.images.blueButtonHover.src = "assets/ui/blueButton_hover.png";
    this.images.blueButtonPressed.onload = this.onLoad;
    this.images.blueButtonPressed.src = "assets/ui/blueButton_pressed.png";
    this.images.redButtonNeutral.onload = this.onLoad;
    this.images.redButtonNeutral.src = "assets/ui/redButton_neutral.png";
    this.images.redButtonHover.onload = this.onLoad;
    this.images.redButtonHover.src = "assets/ui/redButton_hover.png";
    this.images.redButtonPressed.onload = this.onLoad;
    this.images.redButtonPressed.src = "assets/ui/redButton_pressed.png";

    //panels
    this.images.topPanel.onload = this.onLoad;
    this.images.topPanel.src = "assets/ui/topPanel.png";
    this.images.leftPanel.onload = this.onLoad;
    this.images.leftPanel.src = "assets/ui/leftPanel.png";
  },

  onLoad: function() {
    ResourceManager.loadedCount++
    if(ResourceManager.loadedCount === ResourceManager.assetCount)
      ResourceManager.loaded = true;
  }
}
