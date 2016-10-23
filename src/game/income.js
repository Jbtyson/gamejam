var Income = function (name, baseIncome, baseCost) {
  this.name = name;
  this.level = 0;
  this.baseIncome = baseIncome;
  this.baseCost = baseCost;
  this.income = baseIncome;
  this.cost = baseCost;
  this.costMultiplier = 1.1;
  this.calculate();
}

Income.prototype = {
	increase: function() {
    this.level++;
    this.calculate();
  },

  calculate: function() {
    this.income = this.baseIncome * this.level;
    this.cost = Math.floor(this.baseCost * Math.pow(this.costMultiplier, this.level));
  }
}
