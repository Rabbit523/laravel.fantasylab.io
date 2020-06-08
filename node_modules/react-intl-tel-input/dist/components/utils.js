"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AllCountries = _interopRequireDefault(require("./AllCountries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  arraysEqual: function arraysEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (a === null || b === null) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  },
  shallowEquals: function shallowEquals(a, b) {
    if (a === b) {
      return true;
    }

    for (var key in a) {
      if (a[key] !== b[key]) {
        if (Array.isArray(a[key]) && Array.isArray(b[key])) {
          if (!this.arraysEqual(a[key], b[key])) {
            return false;
          }
        } else {
          return false;
        }
      }
    }

    for (var _key in b) {
      if (a.hasOwnProperty(_key) === false) {
        return false;
      }
    }

    return true;
  },
  trim: function trim(str) {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    if (!str) {
      return '';
    }

    return str.replace(rtrim, '');
  },
  isNumeric: function isNumeric(obj) {
    return obj - parseFloat(obj) >= 0;
  },
  retrieveLiIndex: function retrieveLiIndex(node) {
    if (!node) {
      return -1;
    }

    var children = node.parentNode.childNodes;
    var num = 0;

    for (var i = 0, max = children.length; i < max; i++) {
      if (children[i] === node) {
        return num;
      }

      if (children[i].nodeType === 1 && children[i].tagName.toLowerCase() === 'li') {
        num += 1;
      }
    }

    return -1;
  },
  getNumeric: function getNumeric(s) {
    return s.replace(/\D/g, '');
  },
  startsWith: function startsWith(a, b) {
    return a.substr(0, b.length).toUpperCase() === b;
  },
  isWindow: function isWindow(obj) {
    return obj !== null && obj === obj.window;
  },
  getWindow: function getWindow(elem) {
    return this.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  },
  offset: function offset(elem) {
    var docElem = null;
    var win = null;
    var box = {
      top: 0,
      left: 0
    };
    var doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;

    if (_typeof(elem.getBoundingClientRect) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      box = elem.getBoundingClientRect();
    }

    win = this.getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  },
  getOuterHeight: function getOuterHeight(element) {
    return element.offsetHeight + parseFloat(window.getComputedStyle(element).getPropertyValue('margin-top')) + parseFloat(window.getComputedStyle(element).getPropertyValue('margin-bottom'));
  },
  getCountryData: function getCountryData(countries, countryCode, ignoreOnlyCountriesOption, allowFail, errorHandler) {
    var countryList = ignoreOnlyCountriesOption ? _AllCountries.default.getCountries() : countries;

    for (var i = 0; i < countryList.length; i++) {
      if (countryList[i].iso2 === countryCode) {
        return countryList[i];
      }
    }

    if (allowFail) {
      return null;
    }

    if (typeof errorHandler === 'function') {
      errorHandler(countryCode);
    }

    return {};
  },
  findIndex: function findIndex(items, predicate) {
    var index = -1;
    items.some(function (item, i) {
      if (predicate(item)) {
        index = i;
        return true;
      }
    });
    return index;
  },
  getCursorPositionAfterFormating: function getCursorPositionAfterFormating(prevBeforeCursor, prev, next) {
    if (prev === next) {
      return prevBeforeCursor.length;
    }

    var cursorShift = 0;

    if (prev.length > next.length) {
      for (var i = 0, j = 0; i < prevBeforeCursor.length && j < next.length; i += 1) {
        if (prevBeforeCursor[i] !== next[j]) {
          if (isNaN(next[j]) && !isNaN(prevBeforeCursor[i])) {
            i -= 1;
            j += 1;
            cursorShift += 1;
          } else {
            cursorShift -= 1;
          }
        } else {
          j += 1;
        }
      }
    } else {
      for (var _i = 0, _j = 0; _i < prevBeforeCursor.length && _j < next.length; _j += 1) {
        if (prevBeforeCursor[_i] !== next[_j]) {
          if (isNaN(prevBeforeCursor[_i]) && !isNaN(next[_j])) {
            _j -= 1;
            _i += 1;
            cursorShift -= 1;
          } else {
            cursorShift += 1;
          }
        } else {
          _i += 1;
        }
      }
    }

    return prevBeforeCursor.length + cursorShift;
  }
};
exports.default = _default;