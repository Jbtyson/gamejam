var CurrencyManager = function () {
  this.coins = 0;
  this.coinModifier = 1;
  this.lastPaytime = 0;
  this.clickModifier = 1;
  this.incomes = [
    new Income("Dinghy", 1, 10)
  ]
  this.totalIncome = 0;
  this.incomeInterval = 0;
  var _this = this;
  this.interval = setInterval(function() {
    _this.incomes.forEach(function(income) {
      _this.coins += income.income;
    })
  }, 1000);
}

CurrencyManager.prototype = {
	update: function(elapsedTime) {
  },

  coinClick: function(currencyManager) {
    this.coins += this.clickModifier;
  },

  calculateTotalIncome: function() {
    var _this = this;
    this.totalIncome = 0;
    this.incomes.forEach(function(income) {
      _this.totalIncome += income.income;
    });
    this.incomeInterval = this.coinModifier / this.totalIncome * 1000;
    while(this.incomeInterval < 20) {
      this.coinModifier *= 2;
      this.incomeInterval *= 2;
    }
  },

  purchaseIncome: function(index) {
    this.coins -= this.incomes[index].cost;
    this.incomes[index].increase();
    clearInterval(this.interval);
    this.calculateTotalIncome();
    var _this = this;
    this.interval = setInterval(function() {
      _this.coins++;
    }, this.incomeInterval);
  }
}
