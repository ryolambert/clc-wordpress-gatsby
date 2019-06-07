/* eslint-disable import/prefer-default-export, react/prop-types */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRootElement = void 0;

var _react = _interopRequireDefault(require("react"));

var _TopLayout = _interopRequireDefault(require("./TopLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapRootElement = function wrapRootElement(_ref) {
  var element = _ref.element;
  return _react.default.createElement(_TopLayout.default, null, element);
};

exports.wrapRootElement = wrapRootElement;


const transitionDelay = 500

exports.shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    if (location.action === 'PUSH') {
        window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
    } else {
        const savedPosition = getSavedScrollPosition(location)
        window.setTimeout(
            () => window.scrollTo(...(savedPosition || [0, 0])),
            transitionDelay
        )
    }
    return false
}