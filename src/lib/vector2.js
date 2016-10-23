// modified version of https://evanw.github.io/lightgl.js/docs/vector.html
var Vector2 = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector2.prototype = {
  negative: function() {
    return new Vector2(-this.x, -this.y);
  },

  add: function(v) {
    if (v instanceof Vector2) return new Vector2(this.x + v.x, this.y + v.y);
    else return new Vector2(this.x + v, this.y + v);
  },

  subtract: function(v) {
    if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);
    else return new Vector2(this.x - v, this.y - v);
  },

  multiply: function(v) {
    if (v instanceof Vector2) return new Vector2(this.x * v.x, this.y * v.y);
    else return new Vector2(this.x * v, this.y * v);
  },

  divide: function(v) {
    if (v instanceof Vector2) return new Vector2(this.x / v.x, this.y / v.y);
    else return new Vector2(this.x / v, this.y / v);
  },

  equals: function(v) {
    return this.x == v.x && this.y == v.y;
  },

  greaterThan: function(v) {
    return this.x > v.x && this.y > v.y;
  },

  greaterThanOrEqualTo: function(v) {
    return this.x >= v.x && this.y >= v.y;
  },

  lessThan: function(v) {
    return this.x < v.x && this.y < v.y;
  },

  lessThanOrEqualTo: function(v) {
    return this.x <= v.x && this.y <= v.y;
  },

  dot: function(v) {
    return this.x * v.x + this.y * v.y;
  },

  length: function() {
    return Math.sqrt(this.dot(this));
  },

  unit: function() {
    return this.divide(this.length());
  },

  min: function() {
    return Math.min(this.x, this.y);
  },

  max: function() {
    return Math.max(this.x, this.y);
  },

  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },

  clone: function() {
    return new Vector2(this.x, this.y);
  },
};
