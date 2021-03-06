// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var BezierEasing$LayoutAnimationRe = require("./BezierEasing.bs.js");

var timestep = 16.667 * 1.0;

function linear(x) {
  return x;
}

var easeIn = BezierEasing$LayoutAnimationRe.bezier(0.42, 0.0, 1.0, 1.0);

var easeOut = BezierEasing$LayoutAnimationRe.bezier(0.0, 0.0, 0.58, 1.0);

var easeInEaseOut = BezierEasing$LayoutAnimationRe.bezier(0.42, 0.0, 0.58, 1.0);

var StaticEasingFunctions = /* module */[
  /* linear */linear,
  /* easeIn */easeIn,
  /* easeOut */easeOut,
  /* easeInEaseOut */easeInEaseOut
];

function keyframeResultToJs(param) {
  return {
          keyframes: param[/* keyframes */0],
          duration: param[/* duration */1],
          delay: param[/* delay */2]
        };
}

function keyframeResultFromJs(param) {
  return /* record */[
          /* keyframes */param.keyframes,
          /* duration */param.duration,
          /* delay */param.delay
        ];
}

function generateStaticKeyframes(ease, duration, delay) {
  var numSteps = duration / timestep;
  var timestep$1 = 1.0 / numSteps;
  var currentX = /* record */[/* contents */0.0];
  var keyframes = $$Array.init((numSteps | 0) + 2 | 0, (function () {
          var curX = currentX[0];
          currentX[0] += timestep$1;
          return Curry._1(ease, curX);
        }));
  Caml_array.caml_array_set(keyframes, (numSteps | 0) + 1 | 0, 1.0);
  return /* record */[
          /* keyframes */keyframes,
          /* duration */duration,
          /* delay */delay
        ];
}

function generateKeyframes($staropt$star, $staropt$star$1, duration) {
  var ease = $staropt$star !== undefined ? $staropt$star : /* EaseInEaseOut */3;
  var delay = $staropt$star$1 !== undefined ? $staropt$star$1 : 0.0;
  var generator;
  switch (ease) {
    case 0 : 
        generator = (function (param, param$1) {
            return generateStaticKeyframes(linear, param, param$1);
          });
        break;
    case 1 : 
        generator = (function (param, param$1) {
            return generateStaticKeyframes(easeIn, param, param$1);
          });
        break;
    case 2 : 
        generator = (function (param, param$1) {
            return generateStaticKeyframes(easeOut, param, param$1);
          });
        break;
    case 3 : 
        generator = (function (param, param$1) {
            return generateStaticKeyframes(easeInEaseOut, param, param$1);
          });
        break;
    
  }
  return Curry._2(generator, duration, delay);
}

var timestepCoefficient = 1.0;

var springFactor = 0.5;

var linear$1 = /* Linear */0;

var easeIn$1 = /* EaseIn */1;

var easeOut$1 = /* EaseOut */2;

var easeInEaseOut$1 = /* EaseInEaseOut */3;

exports.timestepCoefficient = timestepCoefficient;
exports.springFactor = springFactor;
exports.timestep = timestep;
exports.StaticEasingFunctions = StaticEasingFunctions;
exports.keyframeResultToJs = keyframeResultToJs;
exports.keyframeResultFromJs = keyframeResultFromJs;
exports.linear = linear$1;
exports.easeIn = easeIn$1;
exports.easeOut = easeOut$1;
exports.easeInEaseOut = easeInEaseOut$1;
exports.generateStaticKeyframes = generateStaticKeyframes;
exports.generateKeyframes = generateKeyframes;
/* easeIn Not a pure module */
