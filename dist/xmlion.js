(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.xmlion = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.xmlion = xmlion;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var isArray = Array.isArray;

    var clone = function clone(array) {
        return array.slice(0);
    };
    var join = function join(array) {
        return array.join('');
    };
    var map = function map(fn, array) {
        return array.map(fn);
    };
    var filter = function filter(fn, array) {
        return array.filter(fn);
    };
    var concat = function concat(array) {
        for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arrays[_key - 1] = arguments[_key];
        }

        return array.concat.apply(array, arrays);
    };
    var toStringCub = function toStringCub(c) {
        return c == null ? '' : c.ROARS ? c._buildElementString() : c;
    };
    var mapCubsToString = function mapCubsToString(cubs) {
        return map(toStringCub, cubs);
    };

    var Lion = exports.Lion = function () {
        function Lion(tagName, attributes, cubs) {
            _classCallCheck(this, Lion);

            this.tagName = tagName;
            this.attr = attributes || {};
            this._cubs = cubs || [];
        }

        _createClass(Lion, [{
            key: 'setCubs',
            value: function setCubs(cubs) {
                return this.cubs = cubs;
            }
        }, {
            key: 'getCubs',
            value: function getCubs() {
                return this.cubs;
            }
        }, {
            key: '_buildAttributeString',
            value: function _buildAttributeString() {
                var attr = this.attr;
                var keys = Object.keys(attr);
                if (keys.length > 0) {
                    return join(map(function (key) {
                        return ' ' + key + '="' + attr[key] + '"';
                    }, keys));
                }
                return '';
            }
        }, {
            key: '_buildContentString',
            value: function _buildContentString() {
                return join(mapCubsToString(this._cubs));
            }
        }, {
            key: '_buildElementString',
            value: function _buildElementString() {
                var me = this;
                var tagName = me.tagName;
                var attributes = me._buildAttributeString();

                if (me.hasCubs()) {
                    var content = me._buildContentString();

                    return '<' + tagName + attributes + '>' + content + '</' + tagName + '>';
                } else {
                    return '<' + tagName + attributes + '/>';
                }
            }
        }, {
            key: 'addAttribute',
            value: function addAttribute(name, value) {
                var lion = this;
                lion.attr[name] = value;
                return lion;
            }
        }, {
            key: 'removeAttribute',
            value: function removeAttribute(name) {
                var lion = this;
                if (lion.attr[name]) {
                    delete lion.attr[name];
                }
                return lion;
            }
        }, {
            key: 'addAttributes',
            value: function addAttributes(attr) {
                var lion = this;
                var names = Object.keys(attr);
                map(function (name) {
                    return lion.addAttribute(name, attr[name]);
                }, names);
                return lion;
            }
        }, {
            key: 'addCub',
            value: function addCub(cub) {
                var lion = this;
                lion._cubs.push(cub);
                return lion;
            }
        }, {
            key: 'removeCub',
            value: function removeCub(cub) {
                var lion = this;
                var index = lion._cubs.indexOf(cub);
                if (index >= 0) {
                    lion.cubs = filter(function (c, i) {
                        return i != index;
                    }, lion.cubs);
                }
                return lion;
            }
        }, {
            key: 'addCubs',
            value: function addCubs(cubs) {
                if (isArray(cubs)) {
                    this.cubs = concat(this.cubs, cubs);
                }
                return this;
            }
        }, {
            key: 'removeAllCubs',
            value: function removeAllCubs() {
                this._cubs = [];
                return this;
            }
        }, {
            key: 'hasCubs',
            value: function hasCubs() {
                return this._cubs && this._cubs.length > 0;
            }
        }, {
            key: 'value',
            value: function value() {
                return this._buildElementString();
            }
        }, {
            key: 'ROARS',
            get: function get() {
                return true;
            }
        }, {
            key: 'cubs',
            set: function set(cubs) {
                if (isArray(cubs)) {
                    this._cubs = cubs;
                } else {
                    throw 'Lion wants cubs[]';
                }
            },
            get: function get() {
                return clone(this._cubs);
            }
        }]);

        return Lion;
    }();

    function xmlion(tagName, attributes, cubs) {
        return new Lion(tagName, attributes, cubs);
    }

    exports.default = xmlion;


    module.exports = xmlion;
});