(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.xmlion = f()}})(function(){var define,module,exports;module={exports:(exports={})};
'use strict';

var ROARS = true;

function Lion(tagName, attributes, cubs) {
    if (!this || !this.ROARS) {
        return new Lion(tagName, attributes, cubs);
    }

    this.tagName = tagName;
    this.attr = attributes || {};
    this.cubs = cubs || [];
}

Lion.prototype.ROARS = ROARS;

Lion.prototype._buildAttributeString = function () {
    var _this = this;

    var attributes = '';
    var keys = Object.keys(this.attr);
    if (keys.length > 0) {
        keys.forEach(function (key) {
            attributes += ' ' + key + '="' + _this.attr[key] + '"';
        });
    }
    return attributes;
};

Lion.prototype._buildContentString = function () {
    return this.cubs.map(function (cub) {
        if (cub == null) {
            return '';
        }
        if (cub.ROARS) {
            return cub._buildElementString();
        }

        return cub.toString();
    }).join('');
};

Lion.prototype._buildElementString = function () {
    var me = this;
    var tagName = me.tagName;
    var attributes = me._buildAttributeString();

    if (me.hasCubs()) {
        var content = me._buildContentString();

        return '<' + tagName + attributes + '>' + content + '</' + tagName + '>';
    } else {
        return '<' + tagName + attributes + '/>';
    }
};

Lion.prototype.addAttribute = function (name, value) {
    this.attr[name] = value;
    return this;
};

Lion.prototype.removeAttribute = function (name) {
    if (this.attr[name]) {
        delete this.attr[name];
    }
    return this;
};

Lion.prototype.addAttributes = function (attr) {
    var lion = this;
    var names = Object.keys(attr);
    var len = names.length;
    for (var x = 0; x < len; x++) {
        var name = names[x];
        lion.addAttribute(name, attr[name]);
    }
    return lion;
};

Lion.prototype.hasCubs = function () {
    return this.cubs && this.cubs.length > 0;
};

Lion.prototype.value = function () {
    return this._buildElementString();
};

module.exports = Lion;
return module.exports;});
