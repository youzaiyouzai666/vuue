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
}, __webpack_require__(1), __webpack_require__(3), __webpack_require__(9), {
    observer: _extends({}, __webpack_require__(10))
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

var _text = __webpack_require__(8);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

    var tokens = (0, _text2.default)(nodeValue);
    if (!tokens) return;

    //对于 “姓名: {{name}}劳斯莱斯”，创建3个node，来进行处理
    tokens.forEach(function (token) {
        if (token.tag) {
            //指令节点
            var value = token.value;
            var el = document.createTextNode('');
            _.before(el, node);
            _this._bindDirective(value, el);
        } else {
            //文本节点
            var _el = document.createTextNode(token.value);
            _.before(_el, node);
        }
    }, this);

    _.remove(node);
};

/**
 * 创建directive,
 * @param expression 模板中{{value}}中value
 * @param node  {{value}}实现的node
 * @private
 */
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parse;
/**
 * eg：对于 “姓名: {{name}}劳斯莱斯”，来返回三个对象
 * @param text
 * @returns {Array}
 */
function parse(text) {
    var tokens = []; //内部属性包括{tag:是否是变量,value:值}
    var tagRE = /\{?\{\{(.+?)\}\}\}?/g; //非贪婪模式匹配{}
    var match = void 0,
        index = void 0,
        lastIndex = 0; //
    while (match = tagRE.exec(text)) {
        index = match.index; //匹配到的字符位于原始字符串的基于0的索引值

        //1.处理{{}}前面字符
        if (index > lastIndex) {
            tokens.push({
                tag: false,
                value: text.slice(lastIndex, index)
            });
        }

        //2.处理{{}}内代码
        tokens.push({
            tag: true,
            value: match[1].trim() //[1]表示第一个分组 只处理{{}}中的前后空格
        });

        lastIndex = tagRE.lastIndex; //下一次匹配开始的位置
    }

    //3.处理{{}}后代码
    /*eslint no-magic-numbers: "off"*/
    if (lastIndex < text.length - 1) {
        tokens.push({
            tag: false,
            value: text.slice(lastIndex) //[1]表示第一个分组
        });
    }

    return tokens;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.$mount = function () {
    this._compile();
};

/***/ }),
/* 10 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTE2N2IwMDQyMTcxOWFjNDg3ZDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YW5jZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YW5jZS9iaW5kaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdGFuY2UvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9sYW5nLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJzZXMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL2xpZmVjeWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JzZXJ2ZXIvb2JzZXJ2ZXIuanMiXSwibmFtZXMiOlsiVnV1ZSIsIm9wdGlvbnMiLCJfaW5pdCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwicmVxdWlyZSIsIm9ic2VydmVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpbmRvdyIsIiRkYXRhIiwiZGF0YSIsIiRlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImVsIiwiJHRlbXBsYXRlIiwiY2xvbmVOb2RlIiwiX2RpcmVjdGl2ZXMiLCJjcmVhdGUiLCJvbiIsImJpbmQiLCIkbW91bnQiLCJfdXBkYXRlQmluZGluZ0F0IiwicGF0aCIsImFyZ3VtZW50cyIsImZvckVhY2giLCJkaXJlY3RpdmUiLCJleHByZXNzaW9uIiwidXBkYXRlIiwiXyIsIk5PREVfVFlQRV9FTEUiLCJOT0RFX1RZUEVfVEVYVCIsIl9jb21waWxlIiwiX2NvbXBpbGVOb2RlIiwibm9kZSIsIm5vZGVUeXBlIiwiX2NvbXBpbGVFbGVtZW50IiwiX2NvbXBpbGVUZXh0IiwiaGFzQ2hpbGROb2RlcyIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJub2RlVmFsdWUiLCJ0b2tlbnMiLCJ0b2tlbiIsInRhZyIsInZhbHVlIiwiY3JlYXRlVGV4dE5vZGUiLCJiZWZvcmUiLCJfYmluZERpcmVjdGl2ZSIsInJlbW92ZSIsImRpcnMiLCJwdXNoIiwiZXh0ZW5kIiwidG8iLCJrZXkiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQ2hpbGQiLCJEaXJlY3RpdmUiLCJ2bSIsImF0dHIiLCJwYXJzZSIsInRleHQiLCJ0YWdSRSIsIm1hdGNoIiwiaW5kZXgiLCJsYXN0SW5kZXgiLCJleGVjIiwic2xpY2UiLCJ0cmltIiwibGVuZ3RoIiwiQVJSQVkiLCJPQkpFQ1QiLCJPYnNlcnZlciIsInR5cGUiLCJsaW5rIiwid2FsayIsIm9iaiIsImhhc093blByb3BlcnR5IiwidmFsIiwiY29udmVydCIsIm9iIiwicGFyZW50IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0Iiwic2V0IiwibmV3VmFsIiwibm90aWZ5IiwiZXZlbnQiLCJmbiIsIl9jYnMiLCJhcmciLCJjYWxsYmFja3MiLCJpIiwiYXBwbHkiLCJlbWl0IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7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S0EsSUFBTCxJQUFhLEVBQTdCO0FBQ0EsZ0JBQUlFLFlBQVksS0FBS0YsSUFBTCxDQUFVRixLQUFWLENBQWhCO0FBQ0EsZ0JBQUksQ0FBQ0ksU0FBTCxFQUFnQjtBQUNoQkEsd0JBQVlBLFVBQVUzQixLQUFWLEVBQVo7QUFDQTJCLHNCQUFVeEUsT0FBVixDQUFrQixVQUFDMEQsRUFBRCxFQUFLZSxDQUFMLEVBQVc7QUFDekJELDBCQUFVQyxDQUFWLEVBQWFDLEtBQWIsUUFBeUJILEdBQXpCO0FBQ0gsYUFGRDtBQUdIOzs7K0JBRU1ILEssRUFBZTtBQUFBLCtDQUFMRyxHQUFLO0FBQUxBLG1CQUFLO0FBQUE7O0FBQ2xCLGlCQUFLSSxJQUFMLGNBQVVQLEtBQVYsU0FBb0JHLEdBQXBCO0FBQ0E7QUFDQTs7OztBQUlIOzs7Ozs7QUFJTDs7Ozs7Ozs7QUFNQXJCLFNBQVN6RCxNQUFULEdBQWtCLFVBQVU0QixLQUFWLEVBQWlCO0FBQy9CLFFBQUlQLE1BQU04RCxPQUFOLENBQWN2RCxLQUFkLENBQUosRUFBMEI7QUFDdEIsZUFBTyxJQUFJNkIsUUFBSixDQUFhN0IsS0FBYixFQUFvQjJCLEtBQXBCLENBQVA7QUFDSCxLQUZELE1BRU8sSUFBSSxRQUFPM0IsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQUFyQixFQUErQjtBQUNsQyxlQUFPLElBQUk2QixRQUFKLENBQWE3QixLQUFiLEVBQW9CNEIsTUFBcEIsQ0FBUDtBQUNIO0FBQ0osQ0FORDs7QUFTQXBFLE9BQU9DLE9BQVAsR0FBaUJvRSxRQUFqQixDIiwiZmlsZSI6Ii4vZGlzdC92dXVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTE2N2IwMDQyMTcxOWFjNDg3ZDMiLCIvKipcclxuICpcclxuICogQHBhcmFtIG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBWdXVlIChvcHRpb25zKXtcclxuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XHJcbn1cclxuXHJcblZ1dWUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IFZ1dWUsXHJcbiAgICAuLi5yZXF1aXJlKCcuL2luc3RhbmNlL2luaXQnKSxcclxuICAgIC4uLnJlcXVpcmUoJy4vaW5zdGFuY2UvY29tcGlsZScpLFxyXG4gICAgLi4ucmVxdWlyZSgnLi9hcGkvbGlmZWN5Y2xlJyksXHJcbiAgICBvYnNlcnZlcjogey4uLnJlcXVpcmUoJy4vb2JzZXJ2ZXIvb2JzZXJ2ZXInKX1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuVnV1ZSA9ICBWdXVlOy8vdG9kbyDov5nkuKrlhajlsYDlj5jph4/ov5nkuYjlhpnlpKpsb3fkuoZcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQge191cGRhdGVCaW5kaW5nQXR9IGZyb20gJy4vYmluZGluZ3MnXHJcbi8vIGNvbnN0IF91cGRhdGVCaW5kaW5nQXQgPSByZXF1aXJlKCcuL2JpbmRpbmdzJykuX3VwZGF0ZUJpbmRpbmdBdDtcclxuZXhwb3J0cy5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICB0aGlzLiRkYXRhID0gb3B0aW9ucy5kYXRhO1xyXG4gICAgdGhpcy4kZWwgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbCk7XHJcbiAgICB0aGlzLiR0ZW1wbGF0ZSA9IHRoaXMuJGVsLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRoaXMuX2RpcmVjdGl2ZXMgPSBbXTsvL+WtmOaUvuaMh+S7pFxyXG5cclxuICAgIHRoaXMub2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVyLmNyZWF0ZSh0aGlzLiRkYXRhKTtcclxuXHJcbiAgICAvLyB0aGlzLm9ic2VydmVyLm9uKCdzZXQnLCB0aGlzLiRtb3VudC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMub2JzZXJ2ZXIub24oJ3NldCcsIF91cGRhdGVCaW5kaW5nQXQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gX3VwZGF0ZUJpbmRpbmdBdCgpO1xyXG4gICAgdGhpcy4kbW91bnQoKTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5zdGFuY2UvaW5pdC5qcyIsImV4cG9ydHMuX3VwZGF0ZUJpbmRpbmdBdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgY29uc3QgcGF0aCA9IGFyZ3VtZW50c1swXTtcclxuXHJcbiAgICB0aGlzLl9kaXJlY3RpdmVzLmZvckVhY2goKGRpcmVjdGl2ZSkgPT4ge1xyXG4gICAgICAgIGlmKGRpcmVjdGl2ZS5leHByZXNzaW9uICE9PSBwYXRoKSByZXR1cm47XHJcbiAgICAgICAgZGlyZWN0aXZlLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luc3RhbmNlL2JpbmRpbmdzLmpzIiwiaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsL2luZGV4JztcclxuaW1wb3J0IERpcmVjdGl2ZSBmcm9tICcuLi9kaXJlY3RpdmUnO1xyXG5pbXBvcnQgdGV4dFBhcnNlciBmcm9tICcuLi9wYXJzZXMvdGV4dCc7XHJcblxyXG5jb25zdCBOT0RFX1RZUEVfRUxFICA9IDE7XHJcbmNvbnN0IE5PREVfVFlQRV9URVhUID0gMztcclxuXHJcbi8qKlxyXG4gKiDmm7TmlrBET01cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydHMuX2NvbXBpbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBuZXcgRGlyZWN0aXZlKCk7XHJcbiAgICB0aGlzLl9jb21waWxlTm9kZSh0aGlzLiRlbCk7XHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydHMuX2NvbXBpbGVOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xyXG4gICAgICAgIGNhc2UgTk9ERV9UWVBFX0VMRTpcclxuICAgICAgICAgICAgdGhpcy5fY29tcGlsZUVsZW1lbnQobm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgTk9ERV9UWVBFX1RFWFQ6XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVUZXh0KG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIG5vZGVcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydHMuX2NvbXBpbGVFbGVtZW50ID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKS5mb3JFYWNoKHRoaXMuX2NvbXBpbGVOb2RlLCB0aGlzKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICog5pu05pawRE9NICDlnKh7e31955qEZG9t5YmN5re75YqgIOepunRleHTlhYPntKDvvIznu5nov5nkuKrnqbrlhYPntKDotYvlgLxcclxuICogQHBhcmFtIG5vZGVcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydHMuX2NvbXBpbGVUZXh0ID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIGxldCBub2RlVmFsdWUgPSBub2RlLm5vZGVWYWx1ZTtcclxuICAgIGlmICghbm9kZVZhbHVlIHx8IG5vZGVWYWx1ZSA9PT0gJycpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0b2tlbnMgPSB0ZXh0UGFyc2VyKG5vZGVWYWx1ZSk7XHJcbiAgICBpZiAoIXRva2VucykgcmV0dXJuO1xyXG5cclxuICAgIC8v5a+55LqOIOKAnOWnk+WQjToge3tuYW1lfX3lirPmlq/ojrHmlq/igJ3vvIzliJvlu7oz5Liqbm9kZe+8jOadpei/m+ihjOWkhOeQhlxyXG4gICAgdG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xyXG4gICAgICAgIGlmICh0b2tlbi50YWcpIHsvL+aMh+S7pOiKgueCuVxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0b2tlbi52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGVsICAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xyXG4gICAgICAgICAgICBfLmJlZm9yZShlbCwgbm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2JpbmREaXJlY3RpdmUodmFsdWUsIGVsKTtcclxuICAgICAgICB9IGVsc2Ugey8v5paH5pys6IqC54K5XHJcbiAgICAgICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcclxuICAgICAgICAgICAgXy5iZWZvcmUoZWwsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIF8ucmVtb3ZlKG5vZGUpO1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiDliJvlu7pkaXJlY3RpdmUsXHJcbiAqIEBwYXJhbSBleHByZXNzaW9uIOaooeadv+S4rXt7dmFsdWV9feS4rXZhbHVlXHJcbiAqIEBwYXJhbSBub2RlICB7e3ZhbHVlfX3lrp7njrDnmoRub2RlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnRzLl9iaW5kRGlyZWN0aXZlID0gZnVuY3Rpb24gKGV4cHJlc3Npb24sIG5vZGUpIHtcclxuICAgIGxldCBkaXJzID0gdGhpcy5fZGlyZWN0aXZlcztcclxuICAgIGRpcnMucHVzaChcclxuICAgICAgICBuZXcgRGlyZWN0aXZlKG5vZGUsIHRoaXMsIGV4cHJlc3Npb24pXHJcbiAgICApXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luc3RhbmNlL2NvbXBpbGUuanMiLCJleHBvcnQgKiBmcm9tICcuL2xhbmcnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RvbSc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvaW5kZXguanMiLCIvKipcclxuICpcclxuICogQHBhcmFtIHRvXHJcbiAqIEBwYXJhbSBmcm9tXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRvLCBmcm9tKXtcclxuICAgIGZvcihsZXQga2V5IGluIGZyb20pe1xyXG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG87XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9sYW5nLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZShlbCwgdGFyZ2V0KXtcclxuICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCx0YXJnZXQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoZWwpe1xyXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9kb20uanMiLCIvKipcclxuICogQG1vZHVsZSBDbGFzcyDpgJrov4fnvJPlrZhET03lr7nosaHvvIzlnKjmlLnlj5hkYXRh5pe277yM6YCa6L+HZG9t55qE5byV55So5p2l5pu05pawRE9NXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RpdmUge1xyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4fnvJPlrZhET03lr7nosaHvvIzlnKjmlLnlj5hkYXRh5pe277yM6YCa6L+HZG9t55qE5byV55So5p2l5pu05pawRE9NXHJcbiAgICAgKiBAcGFyYW0gZWwgIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB2bSAgVnV1ZeWFqOWxgOWvueixoVxyXG4gICAgICogQHBhcmFtIGV4cHJlc3Npb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIHZtLCBleHByZXNzaW9uKSB7XHJcbiAgICAgICAgdGhpcy5lbCAgICAgICAgID0gZWw7XHJcbiAgICAgICAgdGhpcy52bSAgICAgICAgID0gdm07XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgICAgICB0aGlzLmF0dHIgICAgICAgPSAnbm9kZVZhbHVlJztcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05pawRE9NXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmVsW3RoaXMuYXR0cl0gPSB0aGlzLnZtLiRkYXRhW3RoaXMuZXhwcmVzc2lvbl07XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGlyZWN0aXZlLmpzIiwiLyoqXHJcbiAqIGVn77ya5a+55LqOIOKAnOWnk+WQjToge3tuYW1lfX3lirPmlq/ojrHmlq/igJ3vvIzmnaXov5Tlm57kuInkuKrlr7nosaFcclxuICogQHBhcmFtIHRleHRcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UodGV4dCkge1xyXG4gICAgbGV0IHRva2VucyAgICA9IFtdOy8v5YaF6YOo5bGe5oCn5YyF5ouse3RhZzrmmK/lkKbmmK/lj5jph48sdmFsdWU65YC8fVxyXG4gICAgY29uc3QgdGFnUkUgICA9IC9cXHs/XFx7XFx7KC4rPylcXH1cXH1cXH0/L2c7Ly/pnZ7otKrlqarmqKHlvI/ljLnphY17fVxyXG4gICAgbGV0IG1hdGNoLFxyXG4gICAgICAgIGluZGV4LFxyXG4gICAgICAgIGxhc3RJbmRleCA9IDA7Ly9cclxuICAgIHdoaWxlIChtYXRjaCA9IHRhZ1JFLmV4ZWModGV4dCkpIHtcclxuICAgICAgICBpbmRleCA9IG1hdGNoLmluZGV4Oy8v5Yy56YWN5Yiw55qE5a2X56ym5L2N5LqO5Y6f5aeL5a2X56ym5Liy55qE5Z+65LqOMOeahOe0ouW8leWAvFxyXG5cclxuICAgICAgICAvLzEu5aSE55CGe3t9feWJjemdouWtl+esplxyXG4gICAgICAgIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xyXG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0YWcgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGV4dC5zbGljZShsYXN0SW5kZXgsIGluZGV4KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLzIu5aSE55CGe3t9feWGheS7o+eggVxyXG4gICAgICAgIHRva2Vucy5wdXNoKHtcclxuICAgICAgICAgICAgdGFnICA6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBtYXRjaFsxXS50cmltKCksLy9bMV3ooajnpLrnrKzkuIDkuKrliIbnu4Qg5Y+q5aSE55CGe3t9feS4reeahOWJjeWQjuepuuagvFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsYXN0SW5kZXggPSB0YWdSRS5sYXN0SW5kZXg7Ly/kuIvkuIDmrKHljLnphY3lvIDlp4vnmoTkvY3nva5cclxuICAgIH1cclxuXHJcbiAgICAvLzMu5aSE55CGe3t9feWQjuS7o+eggVxyXG4gICAgLyplc2xpbnQgbm8tbWFnaWMtbnVtYmVyczogXCJvZmZcIiovXHJcbiAgICBpZihsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCAtIDEpe1xyXG4gICAgICAgIHRva2Vucy5wdXNoKHtcclxuICAgICAgICAgICAgdGFnICA6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGV4dC5zbGljZShsYXN0SW5kZXgpLC8vWzFd6KGo56S656ys5LiA5Liq5YiG57uEXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdG9rZW5zO1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJzZXMvdGV4dC5qcyIsImV4cG9ydHMuJG1vdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fY29tcGlsZSgpO1xyXG59O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS9saWZlY3ljbGUuanMiLCIvKipcclxuICog6YGN5Y6G5pWw5o2uIOW5tue7meaVsOaNru+8iOmAmui/h3NldO+8iee7keWumuS6i+S7tlxyXG4gKiBDcmVhdGVkIGJ5IENBT1lJIG9uIDIwMTcvMTAvOS5cclxuICovXHJcblxyXG5jb25zdCBBUlJBWSAgPSAwO1xyXG5jb25zdCBPQkpFQ1QgPSAxO1xyXG5cclxuY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgdHlwZSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQVJSQVkpIHtcclxuICAgICAgICAgICAgdGhpcy5saW5rKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IE9CSkVDVCkge1xyXG4gICAgICAgICAgICB0aGlzLndhbGsodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsaW5rKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3YWxrKG9iaikge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gb2JqW2tleV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g6YCS5b2SXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9ic2VydmUoa2V5LCB2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0KGtleSwgdmFsKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb2JzZXJ2ZShrZXksIHZhbCkge1xyXG4gICAgICAgIGxldCBvYiA9IE9ic2VydmVyLmNyZWF0ZSh2YWwpO1xyXG4gICAgICAgIGlmICghb2IpIHJldHVybjtcclxuICAgICAgICBvYi5wYXJlbnQgPSB7XHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgb2I6IHRoaXNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V05LiOZ2V05pa55rOV57uR5a6a77yM5Y+v5Lul55CG6Kej5Li65Yqo5oCB57uR5a6a55qE5byA5YWz5aSEXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcGFyYW0gdmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnZlcnQoa2V5LCB2YWwpIHtcclxuICAgICAgICBjb25zdCBvYiA9IHRoaXM7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudmFsdWUsIGtleSwge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlICA6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0ICAgICAgICAgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgICAgICAgICA6IGZ1bmN0aW9uIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IHZhbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gbmV3VmFsO1xyXG4gICAgICAgICAgICAgICAgb2Iubm90aWZ5KCdzZXQnLCBrZXksIG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uKGV2ZW50LCBmbikge1xyXG4gICAgICAgIHRoaXMuX2NicyA9IHRoaXMuX2NicyB8fCB7fTtcclxuICAgICAgICBpZiAoIXRoaXMuX2Nic1tldmVudF0pIHtcclxuICAgICAgICAgICAgdGhpcy5fY2JzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jYnNbZXZlbnRdLnB1c2goZm4pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbWl0KGV2ZW50LCAuLi5hcmcpIHtcclxuICAgICAgICB0aGlzLl9jYnMgICAgID0gdGhpcy5fY2JzIHx8IHt9O1xyXG4gICAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9jYnNbZXZlbnRdO1xyXG4gICAgICAgIGlmICghY2FsbGJhY2tzKSByZXR1cm47XHJcbiAgICAgICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKCk7XHJcbiAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goKG9iLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5KGV2ZW50LCAuLi5hcmcpIHtcclxuICAgICAgICB0aGlzLmVtaXQoZXZlbnQsIC4uLmFyZyk7XHJcbiAgICAgICAgLy90b2RvIOWkhOeQhueItuexu1xyXG4gICAgICAgIC8qbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XHJcbiAgICAgICAgbGV0IG9iID0gcGFyZW50Lm9iO1xyXG4gICAgICAgIG9iLm5vdGlmeShldmVudCwgLi4uYXJnKTsqL1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIHdhcm4g6L+Z5piv5Liq5Z2R77yMY2xhc3PkuK0gc3RhdGlj5pa55rOVIOS4jeiDveiiq+mBjeWOhuWHuuadpVxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICogQHJldHVybnMge09ic2VydmVyfVxyXG4gKi9cclxuT2JzZXJ2ZXIuY3JlYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKHZhbHVlLCBBUlJBWSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmVyKHZhbHVlLCBPQkpFQ1QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JzZXJ2ZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL29ic2VydmVyL29ic2VydmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==