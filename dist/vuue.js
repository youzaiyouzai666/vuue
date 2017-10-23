/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 *
 * @param options
 * @constructor
 */
function Vuue(options) {
    this._init(options);
}

Vuue.prototype = _extends({
    constructor: Vuue
}, __webpack_require__(1), __webpack_require__(3), __webpack_require__(8), {
    observer: _extends({}, __webpack_require__(9))
});
module.exports = window.Vuue = Vuue; //todo 这个全局变量这么写太low了

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bindings = __webpack_require__(2);

// const _updateBindingAt = require('./bindings')._updateBindingAt;
exports._init = function (options) {
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);
    this._directives = []; //存放指令

    this.observer = this.observer.create(this.$data);

    // this.observer.on('set', this.$mount.bind(this));
    this.observer.on('set', _bindings._updateBindingAt.bind(this));

    // _updateBindingAt();
    this.$mount();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports._updateBindingAt = function () {
    var path = arguments[0];

    this._directives.forEach(function (directive) {
        if (directive.expression !== path) return;
        directive.update();
    });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(4);

var _ = _interopRequireWildcard(_index);

var _directive = __webpack_require__(7);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import textParser from '../parses/text';

var NODE_TYPE_ELE = 1;
var NODE_TYPE_TEXT = 3;

/**
 * 更新DOM
 * @private
 */
exports._compile = function () {
    // new Directive();
    this._compileNode(this.$el);
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        case NODE_TYPE_ELE:
            this._compileElement(node);
            break;
        case NODE_TYPE_TEXT:
            this._compileText(node);
            break;
        default:
            return;
    }
};

/**
 *
 * @param node
 * @private
 */
exports._compileElement = function (node) {
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

/**
 * 更新DOM  在{{}}的dom前添加 空text元素，给这个空元素赋值
 * @param node
 * @private
 */
exports._compileText = function (node) {
    var _this = this;

    var nodeValue = node.nodeValue;

    if (!nodeValue || nodeValue === '') return;

    var patt = /{{[\w|/.]+}}/g;
    var ret = nodeValue.match(patt);
    if (!ret) return;

    ret.forEach(function (value) {
        var el = document.createTextNode('');
        node.parentNode.insertBefore(el, node); //todo 此处只对整个文本作用域处理，
        var property = value.replace(/[{}]/g, '');
        // let attr     = property.split('.');
        // for (let i = 0; i < attr.length; i++) {
        //     debugger;
        //     const FIREST = 0;
        //     if (i === FIREST) {
        //         property = this.$data[attr[i]];
        //     } else {
        //         property = property[attr[i]];
        //     }
        //
        // }
        // nodeValue = nodeValue.replace(value, property);
        _this._bindDirective(property, el);
    }, this);

    _.remove(node); //删除原来的DOM
    //node.nodeValue = nodeValue;
    // this.currentNode.appendChild(document.createTextNode(nodeValue));
};

exports._bindDirective = function (expression, node) {
    var dirs = this._directives;
    dirs.push(new _directive2.default(node, this, expression));
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(5);

Object.keys(_lang).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lang[key];
    }
  });
});

var _dom = __webpack_require__(6);

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dom[key];
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extend = extend;
/**
 *
 * @param to
 * @param from
 */
function extend(to, from) {
    for (var key in from) {
        to[key] = from[key];
    }
    return to;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.before = before;
exports.remove = remove;
function before(el, target) {
    target.parentNode.insertBefore(el, target);
}
function remove(el) {
    el.parentNode.removeChild(el);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module Class 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
 */
var Directive = function () {
    /**
     * 通过缓存DOM对象，在改变data时，通过dom的引用来更新DOM
     * @param el  element
     * @param vm  Vuue全局对象
     * @param expression
     */
    function Directive(el, vm, expression) {
        _classCallCheck(this, Directive);

        this.el = el;
        this.vm = vm;
        this.expression = expression;
        this.attr = 'nodeValue';
        this.update();
    }

    /**
     * 更新DOM
     */


    _createClass(Directive, [{
        key: 'update',
        value: function update() {
            this.el[this.attr] = this.vm.$data[this.expression];
        }
    }]);

    return Directive;
}();

exports.default = Directive;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.$mount = function () {
    this._compile();
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 遍历数据 并给数据（通过set）绑定事件
 * Created by CAOYI on 2017/10/9.
 */

var ARRAY = 0;
var OBJECT = 1;

var Observer = function () {
    /**
     *
     * @param value
     * @param type
     */
    function Observer(value, type) {
        _classCallCheck(this, Observer);

        this.value = value;
        if (type === ARRAY) {
            this.link(value);
        } else if (type === OBJECT) {
            this.walk(value);
        }
    }

    _createClass(Observer, [{
        key: 'link',
        value: function link() {}
    }, {
        key: 'walk',
        value: function walk(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var val = obj[key];

                    // 递归
                    // this.observe(key, val);
                    this.convert(key, val);
                }
            }
        }
    }, {
        key: 'observe',
        value: function observe(key, val) {
            var ob = Observer.create(val);
            if (!ob) return;
            ob.parent = {
                key: key,
                ob: this
            };
        }

        /**
         * set与get方法绑定，可以理解为动态绑定的开关处
         * @param key
         * @param val
         */

    }, {
        key: 'convert',
        value: function convert(key, val) {
            var ob = this;
            Object.defineProperty(this.value, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return val;
                },
                set: function set(newVal) {
                    if (newVal === val) return;
                    val = newVal;
                    ob.notify('set', key, newVal);
                }
            });
        }
    }, {
        key: 'on',
        value: function on(event, fn) {
            this._cbs = this._cbs || {};
            if (!this._cbs[event]) {
                this._cbs[event] = [];
            }
            this._cbs[event].push(fn);

            return this;
        }
    }, {
        key: 'emit',
        value: function emit(event) {
            var _this = this;

            for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                arg[_key - 1] = arguments[_key];
            }

            this._cbs = this._cbs || {};
            var callbacks = this._cbs[event];
            if (!callbacks) return;
            callbacks = callbacks.slice();
            callbacks.forEach(function (ob, i) {
                callbacks[i].apply(_this, arg);
            });
        }
    }, {
        key: 'notify',
        value: function notify(event) {
            for (var _len2 = arguments.length, arg = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                arg[_key2 - 1] = arguments[_key2];
            }

            this.emit.apply(this, [event].concat(arg));
            //todo 处理父类
            /*let parent = this.parent;
            if (!parent) return;
            let ob = parent.ob;
            ob.notify(event, ...arg);*/
        }
    }]);

    return Observer;
}();

/**
 *
 * warn 这是个坑，class中 static方法 不能被遍历出来
 * @param value
 * @returns {Observer}
 */


Observer.create = function (value) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return new Observer(value, OBJECT);
    }
};

module.exports = Observer;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThlYjBjODg2MWViNjhjNTBiNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YW5jZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YW5jZS9iaW5kaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdGFuY2UvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9sYW5nLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbGlmZWN5Y2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9vYnNlcnZlci9vYnNlcnZlci5qcyJdLCJuYW1lcyI6WyJWdXVlIiwib3B0aW9ucyIsIl9pbml0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJyZXF1aXJlIiwib2JzZXJ2ZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwid2luZG93IiwiJGRhdGEiLCJkYXRhIiwiJGVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZWwiLCIkdGVtcGxhdGUiLCJjbG9uZU5vZGUiLCJfZGlyZWN0aXZlcyIsImNyZWF0ZSIsIm9uIiwiYmluZCIsIiRtb3VudCIsIl91cGRhdGVCaW5kaW5nQXQiLCJwYXRoIiwiYXJndW1lbnRzIiwiZm9yRWFjaCIsImRpcmVjdGl2ZSIsImV4cHJlc3Npb24iLCJ1cGRhdGUiLCJfIiwiTk9ERV9UWVBFX0VMRSIsIk5PREVfVFlQRV9URVhUIiwiX2NvbXBpbGUiLCJfY29tcGlsZU5vZGUiLCJub2RlIiwibm9kZVR5cGUiLCJfY29tcGlsZUVsZW1lbnQiLCJfY29tcGlsZVRleHQiLCJoYXNDaGlsZE5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsIm5vZGVWYWx1ZSIsInBhdHQiLCJyZXQiLCJtYXRjaCIsImNyZWF0ZVRleHROb2RlIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsInByb3BlcnR5IiwidmFsdWUiLCJyZXBsYWNlIiwiX2JpbmREaXJlY3RpdmUiLCJyZW1vdmUiLCJkaXJzIiwicHVzaCIsImV4dGVuZCIsInRvIiwia2V5IiwiYmVmb3JlIiwidGFyZ2V0IiwicmVtb3ZlQ2hpbGQiLCJEaXJlY3RpdmUiLCJ2bSIsImF0dHIiLCJBUlJBWSIsIk9CSkVDVCIsIk9ic2VydmVyIiwidHlwZSIsImxpbmsiLCJ3YWxrIiwib2JqIiwiaGFzT3duUHJvcGVydHkiLCJ2YWwiLCJjb252ZXJ0Iiwib2IiLCJwYXJlbnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJnZXQiLCJzZXQiLCJuZXdWYWwiLCJub3RpZnkiLCJldmVudCIsImZuIiwiX2NicyIsImFyZyIsImNhbGxiYWNrcyIsInNsaWNlIiwiaSIsImFwcGx5IiwiZW1pdCIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBOzs7OztBQUtBLFNBQVNBLElBQVQsQ0FBZUMsT0FBZixFQUF1QjtBQUNuQixTQUFLQyxLQUFMLENBQVdELE9BQVg7QUFDSDs7QUFFREQsS0FB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R0FBSztBQUFMQSxtQkFBSztBQUFBOztBQUNoQixpQkFBS0QsSUFBTCxHQUFnQixLQUFLQSxJQUFMLElBQWEsRUFBN0I7QUFDQSxnQkFBSUUsWUFBWSxLQUFLRixJQUFMLENBQVVGLEtBQVYsQ0FBaEI7QUFDQSxnQkFBSSxDQUFDSSxTQUFMLEVBQWdCO0FBQ2hCQSx3QkFBWUEsVUFBVUMsS0FBVixFQUFaO0FBQ0FELHNCQUFVaEUsT0FBVixDQUFrQixVQUFDa0QsRUFBRCxFQUFLZ0IsQ0FBTCxFQUFXO0FBQ3pCRiwwQkFBVUUsQ0FBVixFQUFhQyxLQUFiLFFBQXlCSixHQUF6QjtBQUNILGFBRkQ7QUFHSDs7OytCQUVNSCxLLEVBQWU7QUFBQSwrQ0FBTEcsR0FBSztBQUFMQSxtQkFBSztBQUFBOztBQUNsQixpQkFBS0ssSUFBTCxjQUFVUixLQUFWLFNBQW9CRyxHQUFwQjtBQUNBO0FBQ0E7Ozs7QUFJSDs7Ozs7O0FBSUw7Ozs7Ozs7O0FBTUFyQixTQUFTakQsTUFBVCxHQUFrQixVQUFVZ0MsS0FBVixFQUFpQjtBQUMvQixRQUFJWCxNQUFNdUQsT0FBTixDQUFjNUMsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLGVBQU8sSUFBSWlCLFFBQUosQ0FBYWpCLEtBQWIsRUFBb0JlLEtBQXBCLENBQVA7QUFDSCxLQUZELE1BRU8sSUFBSSxRQUFPZixLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQXJCLEVBQStCO0FBQ2xDLGVBQU8sSUFBSWlCLFFBQUosQ0FBYWpCLEtBQWIsRUFBb0JnQixNQUFwQixDQUFQO0FBQ0g7QUFDSixDQU5EOztBQVNBNUQsT0FBT0MsT0FBUCxHQUFpQjRELFFBQWpCLEMiLCJmaWxlIjoiLi9kaXN0L3Z1dWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1OGViMGM4ODYxZWI2OGM1MGI2OCIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFZ1dWUgKG9wdGlvbnMpe1xyXG4gICAgdGhpcy5faW5pdChvcHRpb25zKTtcclxufVxyXG5cclxuVnV1ZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogVnV1ZSxcclxuICAgIC4uLnJlcXVpcmUoJy4vaW5zdGFuY2UvaW5pdCcpLFxyXG4gICAgLi4ucmVxdWlyZSgnLi9pbnN0YW5jZS9jb21waWxlJyksXHJcbiAgICAuLi5yZXF1aXJlKCcuL2FwaS9saWZlY3ljbGUnKSxcclxuICAgIG9ic2VydmVyOiB7Li4ucmVxdWlyZSgnLi9vYnNlcnZlci9vYnNlcnZlcicpfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5WdXVlID0gIFZ1dWU7Ly90b2RvIOi/meS4quWFqOWxgOWPmOmHj+i/meS5iOWGmeWkqmxvd+S6hlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCB7X3VwZGF0ZUJpbmRpbmdBdH0gZnJvbSAnLi9iaW5kaW5ncydcclxuLy8gY29uc3QgX3VwZGF0ZUJpbmRpbmdBdCA9IHJlcXVpcmUoJy4vYmluZGluZ3MnKS5fdXBkYXRlQmluZGluZ0F0O1xyXG5leHBvcnRzLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuJGRhdGEgPSBvcHRpb25zLmRhdGE7XHJcbiAgICB0aGlzLiRlbCAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmVsKTtcclxuICAgIHRoaXMuJHRlbXBsYXRlID0gdGhpcy4kZWwuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGhpcy5fZGlyZWN0aXZlcyA9IFtdOy8v5a2Y5pS+5oyH5LukXHJcblxyXG4gICAgdGhpcy5vYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXIuY3JlYXRlKHRoaXMuJGRhdGEpO1xyXG5cclxuICAgIC8vIHRoaXMub2JzZXJ2ZXIub24oJ3NldCcsIHRoaXMuJG1vdW50LmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5vYnNlcnZlci5vbignc2V0JywgX3VwZGF0ZUJpbmRpbmdBdC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBfdXBkYXRlQmluZGluZ0F0KCk7XHJcbiAgICB0aGlzLiRtb3VudCgpO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbnN0YW5jZS9pbml0LmpzIiwiZXhwb3J0cy5fdXBkYXRlQmluZGluZ0F0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICBjb25zdCBwYXRoID0gYXJndW1lbnRzWzBdO1xyXG5cclxuICAgIHRoaXMuX2RpcmVjdGl2ZXMuZm9yRWFjaCgoZGlyZWN0aXZlKSA9PiB7XHJcbiAgICAgICAgaWYoZGlyZWN0aXZlLmV4cHJlc3Npb24gIT09IHBhdGgpIHJldHVybjtcclxuICAgICAgICBkaXJlY3RpdmUudXBkYXRlKCk7XHJcbiAgICB9KTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5zdGFuY2UvYmluZGluZ3MuanMiLCJpbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwvaW5kZXgnO1xyXG5pbXBvcnQgRGlyZWN0aXZlIGZyb20gJy4uL2RpcmVjdGl2ZSc7XHJcbi8vIGltcG9ydCB0ZXh0UGFyc2VyIGZyb20gJy4uL3BhcnNlcy90ZXh0JztcclxuXHJcbmNvbnN0IE5PREVfVFlQRV9FTEUgID0gMTtcclxuY29uc3QgTk9ERV9UWVBFX1RFWFQgPSAzO1xyXG5cclxuLyoqXHJcbiAqIOabtOaWsERPTVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0cy5fY29tcGlsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIG5ldyBEaXJlY3RpdmUoKTtcclxuICAgIHRoaXMuX2NvbXBpbGVOb2RlKHRoaXMuJGVsKTtcclxuXHJcbn07XHJcblxyXG5cclxuZXhwb3J0cy5fY29tcGlsZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBOT0RFX1RZUEVfRUxFOlxyXG4gICAgICAgICAgICB0aGlzLl9jb21waWxlRWxlbWVudChub2RlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBOT0RFX1RZUEVfVEVYVDpcclxuICAgICAgICAgICAgdGhpcy5fY29tcGlsZVRleHQobm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gbm9kZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0cy5fY29tcGlsZUVsZW1lbnQgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgaWYgKG5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpLmZvckVhY2godGhpcy5fY29tcGlsZU5vZGUsIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOabtOaWsERPTSAg5Zyoe3t9feeahGRvbeWJjea3u+WKoCDnqbp0ZXh05YWD57Sg77yM57uZ6L+Z5Liq56m65YWD57Sg6LWL5YC8XHJcbiAqIEBwYXJhbSBub2RlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnRzLl9jb21waWxlVGV4dCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICBsZXQgbm9kZVZhbHVlID0gbm9kZS5ub2RlVmFsdWU7XHJcblxyXG4gICAgaWYgKCFub2RlVmFsdWUgfHwgbm9kZVZhbHVlID09PSAnJykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHBhdHQgPSAve3tbXFx3fC8uXSt9fS9nO1xyXG4gICAgbGV0IHJldCAgICA9IG5vZGVWYWx1ZS5tYXRjaChwYXR0KTtcclxuICAgIGlmICghcmV0KSByZXR1cm47XHJcblxyXG4gICAgcmV0LmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuICAgICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBub2RlKTsvL3RvZG8g5q2k5aSE5Y+q5a+55pW05Liq5paH5pys5L2c55So5Z+f5aSE55CG77yMXHJcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdmFsdWUucmVwbGFjZSgvW3t9XS9nLCAnJyk7XHJcbiAgICAgICAgLy8gbGV0IGF0dHIgICAgID0gcHJvcGVydHkuc3BsaXQoJy4nKTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IEZJUkVTVCA9IDA7XHJcbiAgICAgICAgLy8gICAgIGlmIChpID09PSBGSVJFU1QpIHtcclxuICAgICAgICAvLyAgICAgICAgIHByb3BlcnR5ID0gdGhpcy4kZGF0YVthdHRyW2ldXTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHByb3BlcnR5ID0gcHJvcGVydHlbYXR0cltpXV07XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZSh2YWx1ZSwgcHJvcGVydHkpO1xyXG4gICAgICAgIHRoaXMuX2JpbmREaXJlY3RpdmUocHJvcGVydHksZWwpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgXy5yZW1vdmUobm9kZSk7Ly/liKDpmaTljp/mnaXnmoRET01cclxuICAgIC8vbm9kZS5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XHJcbiAgICAvLyB0aGlzLmN1cnJlbnROb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGVWYWx1ZSkpO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydHMuX2JpbmREaXJlY3RpdmUgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgbm9kZSkge1xyXG4gICAgbGV0IGRpcnMgPSB0aGlzLl9kaXJlY3RpdmVzO1xyXG4gICAgZGlycy5wdXNoKFxyXG4gICAgICAgIG5ldyBEaXJlY3RpdmUobm9kZSwgdGhpcywgZXhwcmVzc2lvbilcclxuICAgIClcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5zdGFuY2UvY29tcGlsZS5qcyIsImV4cG9ydCAqIGZyb20gJy4vbGFuZyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZG9tJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9pbmRleC5qcyIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gdG9cclxuICogQHBhcmFtIGZyb21cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQodG8sIGZyb20pe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gZnJvbSl7XHJcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcclxuICAgIH1cclxuICAgIHJldHVybiB0bztcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL2xhbmcuanMiLCJleHBvcnQgZnVuY3Rpb24gYmVmb3JlKGVsLCB0YXJnZXQpe1xyXG4gICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLHRhcmdldCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShlbCl7XHJcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL2RvbS5qcyIsIi8qKlxyXG4gKiBAbW9kdWxlIENsYXNzIOmAmui/h+e8k+WtmERPTeWvueixoe+8jOWcqOaUueWPmGRhdGHml7bvvIzpgJrov4dkb23nmoTlvJXnlKjmnaXmm7TmlrBET01cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdGl2ZSB7XHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+e8k+WtmERPTeWvueixoe+8jOWcqOaUueWPmGRhdGHml7bvvIzpgJrov4dkb23nmoTlvJXnlKjmnaXmm7TmlrBET01cclxuICAgICAqIEBwYXJhbSBlbCAgZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHZtICBWdXVl5YWo5bGA5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gZXhwcmVzc2lvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgdm0sIGV4cHJlc3Npb24pIHtcclxuICAgICAgICB0aGlzLmVsICAgICAgICAgPSBlbDtcclxuICAgICAgICB0aGlzLnZtICAgICAgICAgPSB2bTtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xyXG4gICAgICAgIHRoaXMuYXR0ciAgICAgICA9ICdub2RlVmFsdWUnO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrBET01cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZWxbdGhpcy5hdHRyXSA9IHRoaXMudm0uJGRhdGFbdGhpcy5leHByZXNzaW9uXTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kaXJlY3RpdmUuanMiLCJleHBvcnRzLiRtb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2NvbXBpbGUoKTtcclxufTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcGkvbGlmZWN5Y2xlLmpzIiwiLyoqXHJcbiAqIOmBjeWOhuaVsOaNriDlubbnu5nmlbDmja7vvIjpgJrov4dzZXTvvInnu5Hlrprkuovku7ZcclxuICogQ3JlYXRlZCBieSBDQU9ZSSBvbiAyMDE3LzEwLzkuXHJcbiAqL1xyXG5cclxuY29uc3QgQVJSQVkgID0gMDtcclxuY29uc3QgT0JKRUNUID0gMTtcclxuXHJcbmNsYXNzIE9ic2VydmVyIHtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHR5cGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodmFsdWUsIHR5cGUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IEFSUkFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluayh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBPQkpFQ1QpIHtcclxuICAgICAgICAgICAgdGhpcy53YWxrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGluaygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgd2FsayhvYmopIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IG9ialtrZXldO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOmAkuW9klxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vYnNlcnZlKGtleSwgdmFsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydChrZXksIHZhbCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9ic2VydmUoa2V5LCB2YWwpIHtcclxuICAgICAgICBsZXQgb2IgPSBPYnNlcnZlci5jcmVhdGUodmFsKTtcclxuICAgICAgICBpZiAoIW9iKSByZXR1cm47XHJcbiAgICAgICAgb2IucGFyZW50ID0ge1xyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIG9iOiB0aGlzXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldOS4jmdldOaWueazlee7keWumu+8jOWPr+S7peeQhuino+S4uuWKqOaAgee7keWumueahOW8gOWFs+WkhFxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIHZhbFxyXG4gICAgICovXHJcbiAgICBjb252ZXJ0KGtleSwgdmFsKSB7XHJcbiAgICAgICAgY29uc3Qgb2IgPSB0aGlzO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnZhbHVlLCBrZXksIHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZSAgOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldCAgICAgICAgIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICAgICAgICAgOiBmdW5jdGlvbiAobmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsID09PSB2YWwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgICAgIG9iLm5vdGlmeSgnc2V0Jywga2V5LCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbihldmVudCwgZm4pIHtcclxuICAgICAgICB0aGlzLl9jYnMgPSB0aGlzLl9jYnMgfHwge307XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYnNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nic1tldmVudF0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2JzW2V2ZW50XS5wdXNoKGZuKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdChldmVudCwgLi4uYXJnKSB7XHJcbiAgICAgICAgdGhpcy5fY2JzICAgICA9IHRoaXMuX2NicyB8fCB7fTtcclxuICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fY2JzW2V2ZW50XTtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuO1xyXG4gICAgICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgpO1xyXG4gICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChvYiwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeShldmVudCwgLi4uYXJnKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCAuLi5hcmcpO1xyXG4gICAgICAgIC8vdG9kbyDlpITnkIbniLbnsbtcclxuICAgICAgICAvKmxldCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcclxuICAgICAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBvYiA9IHBhcmVudC5vYjtcclxuICAgICAgICBvYi5ub3RpZnkoZXZlbnQsIC4uLmFyZyk7Ki9cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiB3YXJuIOi/meaYr+S4quWdke+8jGNsYXNz5LitIHN0YXRpY+aWueazlSDkuI3og73ooqvpgY3ljoblh7rmnaVcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtPYnNlcnZlcn1cclxuICovXHJcbk9ic2VydmVyLmNyZWF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgQVJSQVkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgT0JKRUNUKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vYnNlcnZlci9vYnNlcnZlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=