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

function Vuue(options) {
    this._init(options);
}

Vuue.prototype = _extends({
    construct: Vuue
}, __webpack_require__(1), __webpack_require__(2), __webpack_require__(3));
module.exports = window.Vuue = Vuue;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports._init = function (options) {
    this.$data = options.data;
    this.$el = document.querySelector(options.el);

    this.$mount();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports._compile = function () {
    this._compileNode(this.$el);
};
var NODE_TYPE_ELE = 1;
var NODE_TYPE_TEXT = 3;

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

exports._compileText = function (node) {
    var _this = this;

    var nodeValue = node.nodeValue;

    if (!nodeValue || nodeValue === '') return;

    var patt = /{{\w+}}/g;
    var ret = nodeValue.match(patt);
    if (!ret) return;

    ret.forEach(function (value) {
        var property = value.replace(/[{}]/g, '');
        nodeValue = value.replace(value, _this.$data[property]);
    }, this);

    node.nodeValue = nodeValue;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.$mount = function () {
    this._compile();
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTI2Y2EwMDRiNmQ4YWJhOWQ5YTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YW5jZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YW5jZS9jb21waWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbGlmZWN5Y2xlLmpzIl0sIm5hbWVzIjpbIlZ1dWUiLCJvcHRpb25zIiwiX2luaXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3QiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpbmRvdyIsIiRkYXRhIiwiZGF0YSIsIiRlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImVsIiwiJG1vdW50IiwiX2NvbXBpbGUiLCJfY29tcGlsZU5vZGUiLCJOT0RFX1RZUEVfRUxFIiwiTk9ERV9UWVBFX1RFWFQiLCJub2RlIiwibm9kZVR5cGUiLCJfY29tcGlsZUVsZW1lbnQiLCJfY29tcGlsZVRleHQiLCJoYXNDaGlsZE5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJub2RlVmFsdWUiLCJwYXR0IiwicmV0IiwibWF0Y2giLCJwcm9wZXJ0eSIsInZhbHVlIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3REEsU0FBU0EsSUFBVCxDQUFlQyxPQUFmLEVBQXVCO0FBQ25CLFNBQUtDLEtBQUwsQ0FBV0QsT0FBWDtBQUNIOztBQUVERCxLQUFLRyxTQUFMO0FBQ0lDLGVBQVdKO0FBRGYsR0FFTyxtQkFBQUssQ0FBUSxDQUFSLENBRlAsRUFHTyxtQkFBQUEsQ0FBUSxDQUFSLENBSFAsRUFJTyxtQkFBQUEsQ0FBUSxDQUFSLENBSlA7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT1IsSUFBUCxHQUFlQSxJQUFoQyxDOzs7Ozs7Ozs7QUNYQU8sUUFBUUwsS0FBUixHQUFnQixVQUFTRCxPQUFULEVBQWlCO0FBQzdCLFNBQUtRLEtBQUwsR0FBYVIsUUFBUVMsSUFBckI7QUFDQSxTQUFLQyxHQUFMLEdBQWFDLFNBQVNDLGFBQVQsQ0FBdUJaLFFBQVFhLEVBQS9CLENBQWI7O0FBRUEsU0FBS0MsTUFBTDtBQUNILENBTEQsQzs7Ozs7Ozs7O0FDQUFSLFFBQVFTLFFBQVIsR0FBdUIsWUFBWTtBQUMvQixTQUFLQyxZQUFMLENBQWtCLEtBQUtOLEdBQXZCO0FBQ0gsQ0FGRDtBQUdBLElBQU1PLGdCQUFpQixDQUF2QjtBQUNBLElBQU1DLGlCQUFpQixDQUF2Qjs7QUFFQVosUUFBUVUsWUFBUixHQUF1QixVQUFVRyxJQUFWLEVBQWdCO0FBQ25DLFlBQVFBLEtBQUtDLFFBQWI7QUFDSSxhQUFLSCxhQUFMO0FBQ0ksaUJBQUtJLGVBQUwsQ0FBcUJGLElBQXJCO0FBQ0E7QUFDSixhQUFLRCxjQUFMO0FBQ0ksaUJBQUtJLFlBQUwsQ0FBa0JILElBQWxCO0FBQ0E7QUFDSjtBQUNJO0FBUlI7QUFVSCxDQVhEOztBQWFBOzs7OztBQUtBYixRQUFRZSxlQUFSLEdBQTBCLFVBQVVGLElBQVYsRUFBZ0I7QUFDdEMsUUFBSUEsS0FBS0ksYUFBTCxFQUFKLEVBQTBCO0FBQ3RCQyxjQUFNQyxJQUFOLENBQVdOLEtBQUtPLFVBQWhCLEVBQTRCQyxPQUE1QixDQUFvQyxLQUFLWCxZQUF6QyxFQUF1RCxJQUF2RDtBQUNIO0FBQ0osQ0FKRDs7QUFNQVYsUUFBUWdCLFlBQVIsR0FBdUIsVUFBVUgsSUFBVixFQUFnQjtBQUFBOztBQUNuQyxRQUFJUyxZQUFZVCxLQUFLUyxTQUFyQjs7QUFFQSxRQUFJLENBQUNBLFNBQUQsSUFBY0EsY0FBYyxFQUFoQyxFQUFvQzs7QUFFcEMsUUFBTUMsT0FBTyxVQUFiO0FBQ0EsUUFBSUMsTUFBU0YsVUFBVUcsS0FBVixDQUFnQkYsSUFBaEIsQ0FBYjtBQUNBLFFBQUksQ0FBQ0MsR0FBTCxFQUFVOztBQUVWQSxRQUFJSCxPQUFKLENBQVksaUJBQVM7QUFDakIsWUFBTUssV0FBV0MsTUFBTUMsT0FBTixDQUFjLE9BQWQsRUFBdUIsRUFBdkIsQ0FBakI7QUFDQU4sb0JBQWlCSyxNQUFNQyxPQUFOLENBQWNELEtBQWQsRUFBcUIsTUFBS3pCLEtBQUwsQ0FBV3dCLFFBQVgsQ0FBckIsQ0FBakI7QUFFSCxLQUpELEVBSUcsSUFKSDs7QUFNQWIsU0FBS1MsU0FBTCxHQUFpQkEsU0FBakI7QUFHSCxDQWxCRCxDOzs7Ozs7Ozs7QUM5QkF0QixRQUFRUSxNQUFSLEdBQWlCLFlBQVk7QUFDekIsU0FBS0MsUUFBTDtBQUNILENBRkQsQyIsImZpbGUiOiIuL2Rpc3QvdnV1ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDEyNmNhMDA0YjZkOGFiYTlkOWE3IiwiZnVuY3Rpb24gVnV1ZSAob3B0aW9ucyl7XHJcbiAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xyXG59XHJcblxyXG5WdXVlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdDogVnV1ZSxcclxuICAgIC4uLnJlcXVpcmUoJy4vaW5zdGFuY2UvaW5pdCcpLFxyXG4gICAgLi4ucmVxdWlyZSgnLi9pbnN0YW5jZS9jb21waWxlJyksXHJcbiAgICAuLi5yZXF1aXJlKCcuL2FwaS9saWZlY3ljbGUnKVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuVnV1ZSA9ICBWdXVlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImV4cG9ydHMuX2luaXQgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgIHRoaXMuJGRhdGEgPSBvcHRpb25zLmRhdGE7XHJcbiAgICB0aGlzLiRlbCAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmVsKTtcclxuXHJcbiAgICB0aGlzLiRtb3VudCgpO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbnN0YW5jZS9pbml0LmpzIiwiZXhwb3J0cy5fY29tcGlsZSAgICAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9jb21waWxlTm9kZSh0aGlzLiRlbCk7XHJcbn07XHJcbmNvbnN0IE5PREVfVFlQRV9FTEUgID0gMTtcclxuY29uc3QgTk9ERV9UWVBFX1RFWFQgPSAzO1xyXG5cclxuZXhwb3J0cy5fY29tcGlsZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBOT0RFX1RZUEVfRUxFOlxyXG4gICAgICAgICAgICB0aGlzLl9jb21waWxlRWxlbWVudChub2RlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBOT0RFX1RZUEVfVEVYVDpcclxuICAgICAgICAgICAgdGhpcy5fY29tcGlsZVRleHQobm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gbm9kZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0cy5fY29tcGlsZUVsZW1lbnQgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgaWYgKG5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpLmZvckVhY2godGhpcy5fY29tcGlsZU5vZGUsIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0cy5fY29tcGlsZVRleHQgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgbGV0IG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xyXG5cclxuICAgIGlmICghbm9kZVZhbHVlIHx8IG5vZGVWYWx1ZSA9PT0gJycpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwYXR0ID0gL3t7XFx3K319L2c7XHJcbiAgICBsZXQgcmV0ICAgID0gbm9kZVZhbHVlLm1hdGNoKHBhdHQpO1xyXG4gICAgaWYgKCFyZXQpIHJldHVybjtcclxuXHJcbiAgICByZXQuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSB2YWx1ZS5yZXBsYWNlKC9be31dL2csICcnKTtcclxuICAgICAgICBub2RlVmFsdWUgICAgICA9IHZhbHVlLnJlcGxhY2UodmFsdWUsIHRoaXMuJGRhdGFbcHJvcGVydHldKTtcclxuXHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICBub2RlLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcclxuXHJcblxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbnN0YW5jZS9jb21waWxlLmpzIiwiZXhwb3J0cy4kbW91bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9jb21waWxlKCk7XHJcbn07XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpL2xpZmVjeWNsZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=