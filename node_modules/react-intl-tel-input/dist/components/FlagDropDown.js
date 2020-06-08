"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CountryList = _interopRequireDefault(require("./CountryList"));

var _RootModal = _interopRequireDefault(require("./RootModal"));

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

var FlagDropDown = function (_Component) {
  _inherits(FlagDropDown, _Component);

  function FlagDropDown() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FlagDropDown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FlagDropDown)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "genSelectedDialCode", function () {
      var _this$props = _this.props,
          separateDialCode = _this$props.separateDialCode,
          dialCode = _this$props.dialCode;
      return separateDialCode ? _react.default.createElement("div", {
        className: "selected-dial-code"
      }, dialCode) : null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "genArrow", function () {
      var _this$props2 = _this.props,
          allowDropdown = _this$props2.allowDropdown,
          showDropdown = _this$props2.showDropdown;
      var arrowClasses = (0, _classnames.default)('arrow', showDropdown ? 'up' : 'down');
      return allowDropdown ? _react.default.createElement("div", {
        className: arrowClasses
      }) : null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "genFlagClassName", function () {
      return (0, _classnames.default)('iti-flag', _defineProperty({}, _this.props.countryCode, !!_this.props.countryCode));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "genCountryList", function () {
      var _this$props3 = _this.props,
          dropdownContainer = _this$props3.dropdownContainer,
          showDropdown = _this$props3.showDropdown,
          isMobile = _this$props3.isMobile,
          allowDropdown = _this$props3.allowDropdown,
          setFlag = _this$props3.setFlag,
          countries = _this$props3.countries,
          inputTop = _this$props3.inputTop,
          inputOuterHeight = _this$props3.inputOuterHeight,
          preferredCountries = _this$props3.preferredCountries,
          highlightedCountry = _this$props3.highlightedCountry,
          changeHighlightCountry = _this$props3.changeHighlightCountry;
      return _react.default.createElement(_CountryList.default, {
        ref: function ref(countryList) {
          _this.countryList = countryList;
        },
        dropdownContainer: dropdownContainer,
        isMobile: isMobile,
        showDropdown: allowDropdown && showDropdown,
        setFlag: setFlag,
        countries: countries,
        inputTop: inputTop,
        inputOuterHeight: inputOuterHeight,
        preferredCountries: preferredCountries,
        highlightedCountry: highlightedCountry,
        changeHighlightCountry: changeHighlightCountry
      });
    });

    return _this;
  }

  _createClass(FlagDropDown, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          refCallback = _this$props4.refCallback,
          allowDropdown = _this$props4.allowDropdown,
          clickSelectedFlag = _this$props4.clickSelectedFlag,
          handleSelectedFlagKeydown = _this$props4.handleSelectedFlagKeydown,
          titleTip = _this$props4.titleTip,
          dropdownContainer = _this$props4.dropdownContainer,
          showDropdown = _this$props4.showDropdown;
      return _react.default.createElement("div", {
        ref: refCallback,
        className: "flag-container"
      }, _react.default.createElement("div", {
        className: "selected-flag",
        tabIndex: allowDropdown ? '0' : '',
        onClick: clickSelectedFlag,
        onKeyDown: handleSelectedFlagKeydown,
        title: titleTip
      }, _react.default.createElement("div", {
        className: this.genFlagClassName()
      }), this.genSelectedDialCode(), this.genArrow()), dropdownContainer && showDropdown ? _react.default.createElement(_RootModal.default, null, this.genCountryList()) : this.genCountryList());
    }
  }]);

  return FlagDropDown;
}(_react.Component);

exports.default = FlagDropDown;
FlagDropDown.__docgenInfo = {
  "description": "",
  "methods": [{
    "name": "genSelectedDialCode",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "genArrow",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "genFlagClassName",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "genCountryList",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }],
  "displayName": "FlagDropDown",
  "props": {
    "allowDropdown": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "dropdownContainer": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "separateDialCode": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "dialCode": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "countryCode": {
      "type": {
        "name": "string"
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
    "clickSelectedFlag": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "handleSelectedFlagKeydown": {
      "type": {
        "name": "func"
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
    },
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
    "titleTip": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "refCallback": {
      "type": {
        "name": "func"
      },
      "required": true,
      "description": ""
    }
  }
};