(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.xmlion = mod.exports;
    }
})(this, function (exports) {
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

    var Lion = exports.Lion = function () {
        function Lion(tagName, attributes, cubs) {
            _classCallCheck(this, Lion);

            this.tagName = tagName;
            this.attr = attributes || {};
            this.cubs = cubs || [];
        }

        _createClass(Lion, [{
            key: '_buildAttributeString',
            value: function _buildAttributeString() {
                var _this = this;

                var attributes = '';
                var keys = Object.keys(this.attr);
                if (keys.length > 0) {
                    keys.forEach(function (key) {
                        attributes += ' ' + key + '="' + _this.attr[key] + '"';
                    });
                }
                return attributes;
            }
        }, {
            key: '_buildContentString',
            value: function _buildContentString() {
                return this.cubs.map(function (cub) {
                    if (cub == null) {
                        return '';
                    }
                    if (cub.ROARS) {
                        return cub._buildElementString();
                    }

                    return cub.toString();
                }).join('');
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
                this.attr[name] = value;
                return this;
            }
        }, {
            key: 'removeAttribute',
            value: function removeAttribute(name) {
                if (this.attr[name]) {
                    delete this.attr[name];
                }
                return this;
            }
        }, {
            key: 'addAttributes',
            value: function addAttributes(attr) {
                var lion = this;
                var names = Object.keys(attr);
                var len = names.length;
                for (var x = 0; x < len; x++) {
                    var name = names[x];
                    lion.addAttribute(name, attr[name]);
                }
                return lion;
            }
        }, {
            key: 'addCub',
            value: function addCub(cub) {
                this.cubs.push(cub);
                return this;
            }
        }, {
            key: 'removeCub',
            value: function removeCub(cub) {
                var lion = this;
                var index = lion.cubs.indexOf(cub);
                if (index >= 0) {
                    lion.cubs = lion.cubs.filter(function (c, i) {
                        return i != index;
                    });
                }
                return lion;
            }
        }, {
            key: 'addCubs',
            value: function addCubs(cubs) {
                this.cubs = this.cubs.concat(cubs);
                return this;
            }
        }, {
            key: 'removeAllCubs',
            value: function removeAllCubs() {
                this.cubs = [];
                return this;
            }
        }, {
            key: 'hasCubs',
            value: function hasCubs() {
                return this.cubs && this.cubs.length > 0;
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
        }]);

        return Lion;
    }();

    function xmlion(tagName, attributes, cubs) {
        return new Lion(tagName, attributes, cubs);
    }

    exports.default = xmlion;
});