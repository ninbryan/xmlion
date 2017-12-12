(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xmlion = {})));
}(this, (function (exports) { 'use strict';

var isArray = Array.isArray;
var clone = function (array) { return array.slice(0); };
var join = function (array) { return array.join(''); };
var map = function (fn, array) { return array.map(fn); };
var filter = function (fn, array) { return array.filter(fn); };
var concat = function (array) {
  var arrays = [], len = arguments.length - 1;
  while ( len-- > 0 ) arrays[ len ] = arguments[ len + 1 ];

  return array.concat.apply(array, arrays);
};
var toStringCub = function (c) { return c == null ? '' : c.ROARS ? c._buildElementString() : c; };
var mapCubsToString = function (cubs) { return map(toStringCub, cubs); };

var Lion = function Lion (tagName, attributes, cubs) {
  this.tagName = tagName;
  this.attr = attributes || {};
  this.cubs = cubs || [];
};

var prototypeAccessors = { ROARS: {},cubs: {},attributes: {} };

prototypeAccessors.ROARS.get = function () {
  return true;
};

prototypeAccessors.cubs.set = function (cubs) {
  if (isArray(cubs)) {
    this._cubs = cubs;
  } else {
    throw new TypeError('Lion wants cub[]');
  }
};

prototypeAccessors.cubs.get = function () {
  return clone(this._cubs);
};

prototypeAccessors.attributes.set = function (attr) {
  this.attr = attr;
};

prototypeAccessors.attributes.get = function () {
  return this.attr;
};

Lion.prototype.setCubs = function setCubs (cubs) {
  this.cubs = cubs;
  return this;
};

Lion.prototype.getCubs = function getCubs () {
  return this.cubs;
};

Lion.prototype.setAttributes = function setAttributes (attr) {
  this.attributes = attr;
  return this;
};

Lion.prototype.getAttributes = function getAttributes () {
  return this.attributes;
};

Lion.prototype.handleBuildAttribute = function handleBuildAttribute (key, value) {
  if (value === null || value === undefined) {
    return key;
  }
  return (key + "=\"" + value + "\"");
};

Lion.prototype._buildAttributeString = function _buildAttributeString () {
    var this$1 = this;

  var attr = this.attr;
  var keys = Object.keys(attr).sort();
  if (keys.length > 0) {
    return join(map(function (key) { return (" " + (this$1.handleBuildAttribute(key, attr[key]))); }, keys));
  }
  return '';
};

Lion.prototype._buildContentString = function _buildContentString () {
  return join(mapCubsToString(this._cubs));
};

Lion.prototype._buildElementString = function _buildElementString () {
  var me = this;
  var tagName = me.tagName;
  var attributes = me._buildAttributeString();

  if (me.hasCubs()) {
    var content = me._buildContentString();

    return ("<" + tagName + attributes + ">" + content + "</" + tagName + ">");
  } else {
    return ("<" + tagName + attributes + "/>");
  }
};

Lion.prototype.addAttribute = function addAttribute (name, value) {
  var lion = this;
  lion.attr[name] = value;
  return lion;
};

Lion.prototype.removeAttribute = function removeAttribute (name) {
  var lion = this;
  if (lion.attr[name]) {
    delete lion.attr[name];
  }
  return lion;
};

Lion.prototype.addAttributes = function addAttributes (attr) {
  var lion = this;
  var names = Object.keys(attr);
  map(function (name) { return lion.addAttribute(name, attr[name]); }, names);
  return lion;
};

Lion.prototype.addCub = function addCub (cub) {
  var lion = this;
  lion._cubs.push(cub);
  return lion;
};

Lion.prototype.removeCub = function removeCub (cub) {
  var lion = this;
  var index = lion._cubs.indexOf(cub);
  if (index >= 0) {
    lion.cubs = filter(function (c, i) { return (i !== index); }, lion.cubs);
  }
  return lion;
};

Lion.prototype.addCubs = function addCubs (cubs) {
  if (isArray(cubs)) {
    this.cubs = concat(this.cubs, cubs);
  }
  return this;
};

Lion.prototype.removeAllCubs = function removeAllCubs () {
  this._cubs = [];
  return this;
};

Lion.prototype.hasCubs = function hasCubs () {
  return this._cubs && this._cubs.length > 0;
};

Lion.prototype.value = function value () {
  return this._buildElementString();
};

Object.defineProperties( Lion.prototype, prototypeAccessors );

var xmlion = function (tagName, attributes, cubs) { return new Lion(tagName, attributes, cubs); };

exports.Lion = Lion;
exports.xmlion = xmlion;

Object.defineProperty(exports, '__esModule', { value: true });

})));
