'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createInput = createInput;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require('libphonenumber-js/core');

var _InputBasic = require('./InputBasic');

var _InputBasic2 = _interopRequireDefault(_InputBasic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function createInput(defaultMetadata) {
	function PhoneInput(_ref, ref) {
		var country = _ref.country,
		    value = _ref.value,
		    onChange = _ref.onChange,
		    metadata = _ref.metadata,
		    rest = _objectWithoutProperties(_ref, ['country', 'value', 'onChange', 'metadata']);

		var _useState = (0, _react.useState)(country),
		    _useState2 = _slicedToArray(_useState, 2),
		    prevCountry = _useState2[0],
		    setPrevCountry = _useState2[1];

		var _useState3 = (0, _react.useState)(getParsedInputForValue(value, country, metadata)),
		    _useState4 = _slicedToArray(_useState3, 2),
		    parsedInput = _useState4[0],
		    setParsedInput = _useState4[1];

		var _useState5 = (0, _react.useState)(value),
		    _useState6 = _slicedToArray(_useState5, 2),
		    valueForParsedInput = _useState6[0],
		    setValueForParsedInput = _useState6[1];
		// If `value` property has been changed externally
		// then re-initialize the component.


		(0, _react.useEffect)(function () {
			if (value !== valueForParsedInput) {
				setParsedInput(getParsedInputForValue(value, country, metadata));
				setValueForParsedInput(value);
			}
		}, [value]);
		// If the `country` has been changed then re-initialize the component.
		(0, _react.useEffect)(function () {
			if (country !== prevCountry) {
				setPrevCountry(country);
				setParsedInput(getParsedInputForValue(value, country, metadata));
			}
		}, [country]);
		// Call `onChange` after the new `valueForParsedInput` has been applied.
		(0, _react.useEffect)(function () {
			if (valueForParsedInput !== value) {
				onChange(valueForParsedInput);
			}
		}, [valueForParsedInput]);
		var onParsedInputChange = (0, _react.useCallback)(function (parsedInput) {
			var value = void 0;
			if (country) {
				// Won't allow `+` in the beginning
				// when a `country` has been specified.
				if (parsedInput && parsedInput[0] === '+') {
					parsedInput = parsedInput.slice(1);
				}
				// Convert `parsedInput` to `value`.
				if (parsedInput) {
					var asYouType = new _core.AsYouType(country, metadata);
					asYouType.input(parsedInput);
					var phoneNumber = asYouType.getNumber();
					if (phoneNumber) {
						value = phoneNumber.number;
					}
				}
			} else {
				// Force a `+` in the beginning of a `value`
				// when no `country` has been specified.
				if (parsedInput && parsedInput[0] !== '+') {
					parsedInput = '+' + parsedInput;
				}
				// Convert `parsedInput` to `value`.
				if (parsedInput) {
					value = parsedInput;
				}
			}
			setParsedInput(parsedInput);
			setValueForParsedInput(value);
		}, [country, metadata, setParsedInput, setValueForParsedInput]);
		return _react2.default.createElement(_InputBasic2.default, _extends({}, rest, {
			ref: ref,
			metadata: metadata,
			country: country,
			value: parsedInput,
			onChange: onParsedInputChange }));
	}

	PhoneInput = _react2.default.forwardRef(PhoneInput);

	PhoneInput.propTypes = {
		/**
   * HTML `<input/>` `type` attribute.
   */
		type: _propTypes2.default.string,

		/**
   * HTML `<input/>` `autocomplete` attribute.
   */
		autoComplete: _propTypes2.default.string,

		/**
   * A two-letter country code for formatting `value`
   * as a national phone number (e.g. `(800) 555 35 35`).
   * Examples: "US", "RU", etc.
   * If no `country` is passed then `value`
   * is formatted as an international phone number.
   * (for example, `+7 800 555 35 35`)
   */
		country: _propTypes2.default.string,

		/**
   * The parsed phone number.
   * Examples: `undefined`, `""`, `"+"`, `"+123"`, `"123"`.
   */
		value: _propTypes2.default.string,

		/**
   * Updates the `value`.
   */
		onChange: _propTypes2.default.func.isRequired,

		/**
   * The `<input/>` component.
   */
		inputComponent: _propTypes2.default.elementType,

		/**
   * `libphonenumber-js` metadata.
   */
		metadata: _propTypes2.default.object.isRequired
	};

	PhoneInput.defaultProps = {
		/**
   * HTML `<input/>` `type="tel"`.
   */
		type: 'tel',

		/**
   * Remember (and autofill) the value as a phone number.
   */
		autoComplete: 'tel',

		/**
   * `libphonenumber-js` metadata.
   */
		metadata: defaultMetadata
	};

	return PhoneInput;
}

exports.default = createInput();


function getParsedInputForValue(value, country, metadata) {
	if (!value) {
		return '';
	}
	if (!country) {
		return value;
	}
	var asYouType = new _core.AsYouType(country, metadata);
	asYouType.input(value);
	var phoneNumber = asYouType.getNumber();
	if (phoneNumber) {
		// Even if the actual country of the `value` being passed
		// doesn't match the `country` property,
		// still format the national number.
		// This is some kind of an "error recovery" procedure.
		if (phoneNumber.country && phoneNumber.country !== country) {
			console.error('[react-phone-number-input] Phone number ' + value + ' corresponds to country ' + phoneNumber.country + ' but ' + country + ' was specified instead.');
		}
		return phoneNumber.formatNational();
	} else {
		return '';
	}
}
//# sourceMappingURL=PhoneInputNoCountrySelect.js.map