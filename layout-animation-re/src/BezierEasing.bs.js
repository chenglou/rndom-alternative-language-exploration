// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Pervasives = require("bs-platform/lib/js/pervasives.js");

var kSampleStepSize = 1.0 / (11 - 1.0);

function a(aA1, aA2) {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}

function b(aA1, aA2) {
  return 3.0 * aA2 - 6.0 * aA1;
}

function c(aA1) {
  return 3.0 * aA1;
}

function calcBezier(aT, aA1, aA2) {
  return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + 3.0 * aA1) * aT;
}

function getSlope(aT, aA1, aA2) {
  return 3.0 * a(aA1, aA2) * aT * aT + 2.0 * b(aA1, aA2) * aT + 3.0 * aA1;
}

function binarySubdivide(param, param$1, param$2, param$3, param$4) {
  var _currentT = 0.0;
  var _currentX = 0.0;
  var _i = 0;
  var aX = param;
  var _aA = param$1;
  var _aB = param$2;
  var mX1 = param$3;
  var mX2 = param$4;
  while(true) {
    var aB = _aB;
    var aA = _aA;
    var i = _i;
    var currentX = _currentX;
    var currentT = _currentT;
    var match = Math.abs(currentX) > 0.0000001 && (i + 1 | 0) < 10;
    if (match) {
      var currentT$1 = aA + (aB - aA) / 2.0;
      var currentX$1 = calcBezier(currentT$1, mX1, mX2) - aX;
      var i$1 = i + 1 | 0;
      if (currentX$1 > 0.0) {
        _aB = currentT$1;
        _i = i$1;
        _currentX = currentX$1;
        _currentT = currentT$1;
        continue ;
      } else {
        _aA = currentT$1;
        _i = i$1;
        _currentX = currentX$1;
        _currentT = currentT$1;
        continue ;
      }
    } else {
      return currentT;
    }
  };
}

function newtonRaphsonIterate(param, param$1, param$2, param$3) {
  var _i = 0;
  var aX = param;
  var _aGuessT = param$1;
  var mX1 = param$2;
  var mX2 = param$3;
  while(true) {
    var aGuessT = _aGuessT;
    var i = _i;
    var match = i < 4;
    if (match) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope !== 0.0) {
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        var aGuessT$1 = aGuessT - currentX / currentSlope;
        var i$1 = i + 1 | 0;
        _aGuessT = aGuessT$1;
        _i = i$1;
        continue ;
      } else {
        return aGuessT;
      }
    } else {
      return aGuessT;
    }
  };
}

function linearEasing(x) {
  return x;
}

function bezier(mX1, mY1, mX2, mY2) {
  var match = !(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1);
  if (match) {
    return Pervasives.failwith("bezier x values must be in [0, 1] range");
  } else {
    var match$1 = mX1 === mY1 && mX2 === mY2;
    if (match$1) {
      return linearEasing;
    } else {
      var sampleValues = new Array(11);
      for(var i = 0; i <= 10; ++i){
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
      var getTForX = function (aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = 10;
        while(currentSample !== lastSample && sampleValues[currentSample] <= aX) {
          intervalStart += kSampleStepSize;
          currentSample = currentSample + 1 | 0;
        };
        currentSample = currentSample - 1 | 0;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1 | 0] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        var match = initialSlope >= 0.001;
        var match$1 = initialSlope === 0.0;
        if (match) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (match$1) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      };
      return (function (x) {
          if (x !== 0.0) {
            if (x !== 1.0) {
              return calcBezier(getTForX(x), mY1, mY2);
            } else {
              return 1.0;
            }
          } else {
            return 0.0;
          }
        });
    }
  }
}

var newtonIterations = 4;

var newtonMinSlope = 0.001;

var subdivisionPrecision = 0.0000001;

var subdivisionMaxIterations = 10;

var kSplineTableSize = 11;

exports.newtonIterations = newtonIterations;
exports.newtonMinSlope = newtonMinSlope;
exports.subdivisionPrecision = subdivisionPrecision;
exports.subdivisionMaxIterations = subdivisionMaxIterations;
exports.kSplineTableSize = kSplineTableSize;
exports.kSampleStepSize = kSampleStepSize;
exports.a = a;
exports.b = b;
exports.c = c;
exports.calcBezier = calcBezier;
exports.getSlope = getSlope;
exports.binarySubdivide = binarySubdivide;
exports.newtonRaphsonIterate = newtonRaphsonIterate;
exports.linearEasing = linearEasing;
exports.bezier = bezier;
/* No side effect */
