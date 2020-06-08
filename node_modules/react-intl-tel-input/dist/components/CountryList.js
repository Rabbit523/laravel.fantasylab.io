"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = _interopRequireDefault(require("./utils"));

var _FlagBox = _interopRequireDefault(require("./FlagBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CountryList = function (_Component) {
  _inherits(CountryList, _Component);

  function CountryList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CountryList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CountryList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setDropdownPosition", function () {
      _this.listElement.classList.remove('hide');

      var inputTop = _this.props.inputTop;
      var windowTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var inputOuterHeight = _this.props.inputOuterHeight;

      var countryListOuterHeight = _utils.default.getOuterHeight(_this.listElement);

      var dropdownFitsBelow = inputTop + inputOuterHeight + countryListOuterHeight < windowTop + windowHeight;
      var dropdownFitsAbove = inputTop - countryListOuterHeight > windowTop;
      var cssTop = !dropdownFitsBelow && dropdownFitsAbove ? "-".concat(countryListOuterHeight - 1, "px") : '';
      _this.listElement.style.top = cssTop;

      _this.listElement.classList.remove('v-hide');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "appendListItem", function (countries) {
      var isPreferred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var preferredCountriesCount = _this.props.preferredCountries.length;
      return countries.map(function (country, index) {
        var actualIndex = isPreferred ? index : index + preferredCountriesCount;
        var countryClassObj = {
          country: true,
          highlight: _this.props.highlightedCountry === actualIndex,
          preferred: isPreferred
        };
        var countryClass = (0, _classnames.default)(countryClassObj);
        var onMouseOverOrFocus = _this.props.isMobile ? function () {} : _this.handleMouseOver;
        var keyPrefix = isPreferred ? 'pref-' : '';
        return _react.default.createElement(_FlagBox.default, {
          key: "".concat(keyPrefix).concat(country.iso2),
          dialCode: country.dialCode,
          isoCode: country.iso2,
          name: country.name,
          onMouseOver: onMouseOverOrFocus,
          onClick: function onClick() {
            return _this.props.setFlag(country.iso2);
          },
          onFocus: onMouseOverOrFocus,
          flagRef: function flagRef(selectedFlag) {
            _this.selectedFlag = selectedFlag;
          },
          innerFlagRef: function innerFlagRef(selectedFlagInner) {
            _this.selectedFlagInner = selectedFlagInner;
          },
          countryClass: countryClass
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseOver", function (e) {
      if (e.currentTarget.getAttribute('class').indexOf('country') > -1) {
        var selectedIndex = _utils.default.retrieveLiIndex(e.currentTarget);

        _this.props.changeHighlightCountry(true, selectedIndex);
      }
    });

    return _this;
  }

  _createClass(CountryList, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var shouldUpdate = !_utils.default.shallowEquals(this.props, nextProps);

      if (shouldUpdate && nextProps.showDropdown) {
        this.listElement.classList.add('v-hide');
        this.setDropdownPosition();
      }

      return shouldUpdate;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          preferredCountries = _this$props.preferredCountries,
          countries = _this$props.countries,
          showDropdown = _this$props.showDropdown;
      var className = (0, _classnames.default)('country-list', {
        hide: !showDropdown
      });
      var preferredOptions = this.appendListItem(preferredCountries, true);
      var allOptions = this.appendListItem(countries);

      var divider = _react.default.createElement("div", {
        className: "divider"
      });

      return _react.default.createElement("ul", {
        ref: function ref(listElement) {
          _this2.listElement = listElement;
        },
        className: className
      }, preferredOptions, preferredCountries.length > 0 ? divider : null, allOptions);
    }
  }]);

  return CountryList;
}(_react.Component);

exports.default = CountryList;
CountryList.__docgenInfo = {
  "description": "",
  "methods": [{
    "name": "setDropdownPosition",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "appendListItem",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "countries",
      "type": null
    }, {
      "name": "isPreferred",
      "type": null
    }],
    "returns": null
  }, {
    "name": "handleMouseOver",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }],
  "displayName": "CountryList",
  "props": {
    "setFlag": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "countries": {
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "object"
        }
      },
      "required": false,
      "description": ""
    },
    "inputTop": {
      "type": {
        "name": "number"
      },
      "required": false,
      "description": ""
    },
    "inputOuterHeight": {
      "type": {
        "name": "number"
      },
      "required": false,
      "description": ""
    },
    "preferredCountries": {
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "object"
        }
      },
      "required": false,
      "description": ""
    },
    "highlightedCountry": {
      "type": {
        "name": "number"
      },
      "required": false,
      "description": ""
    },
    "changeHighlightCountry": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "showDropdown": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "isMobile": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    }
  }
};