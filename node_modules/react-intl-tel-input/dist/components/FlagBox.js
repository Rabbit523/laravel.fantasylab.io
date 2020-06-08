"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlagBox = function FlagBox(_ref) {
  var dialCode = _ref.dialCode,
      isoCode = _ref.isoCode,
      name = _ref.name,
      onMouseOver = _ref.onMouseOver,
      onFocus = _ref.onFocus,
      onClick = _ref.onClick,
      flagRef = _ref.flagRef,
      innerFlagRef = _ref.innerFlagRef,
      countryClass = _ref.countryClass;
  return _react.default.createElement("li", {
    className: countryClass,
    "data-dial-code": dialCode,
    "data-country-code": isoCode,
    onMouseOver: onMouseOver,
    onFocus: onFocus,
    onClick: onClick
  }, _react.default.createElement("div", {
    ref: flagRef,
    className: "flag-box"
  }, _react.default.createElement("div", {
    ref: innerFlagRef,
    className: "iti-flag ".concat(isoCode)
  })), _react.default.createElement("span", {
    className: "country-name"
  }, name), _react.default.createElement("span", {
    className: "dial-code"
  }, "+ ".concat(dialCode)));
};

FlagBox.defaultProps = {
  onFocus: function onFocus() {},
  onMouseOver: function onMouseOver() {},
  onClick: function onClick() {}
};
var _default = FlagBox;
exports.default = _default;
FlagBox.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "FlagBox",
  "props": {
    "onFocus": {
      "defaultValue": {
        "value": "() => {}",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "onMouseOver": {
      "defaultValue": {
        "value": "() => {}",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "onClick": {
      "defaultValue": {
        "value": "() => {}",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "dialCode": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "isoCode": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "name": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "flagRef": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "innerFlagRef": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "countryClass": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    }
  }
};